const Bottleneck = require('bottleneck');
const aigle = require('aigle');
const eveTechAPI = require('./eveTechAPI');
const dbTools = require('../../db/tools');

const rateLimiter = new Bottleneck({ maxConcurrent: 5, minTime: 100 });

class MarketWorker {
  static async addIfDoesNotExistPrice(price) {
    const { type_id, average_price, adjusted_price } = price;   // eslint-disable-line
    const itemQueryResult = await dbTools.findBy('items', 'type_id', type_id);
    if (itemQueryResult.length === 0) {
      const itemMeta = await eveTechAPI.getItemFromTypeId(type_id);

      itemMeta.dogma_attributes = JSON.stringify(itemMeta.dogma_attributes);
      itemMeta.dogma_effects = JSON.stringify(itemMeta.dogma_effects);
      itemMeta.mass = 0;

      const itemFinalForm = {
        ...itemMeta,
        average_price: Math.floor(average_price) || null,
        adjusted_price: Math.floor(adjusted_price) || null,
      };
      return dbTools.addItem(itemFinalForm);
    }

    console.log(type_id, 'was in the db already');
    return itemQueryResult;
  }

  async getItems() {
    const prices = await eveTechAPI.getCurrentPrices();

    const results = await aigle.map(prices, price => rateLimiter
      .schedule(() => this.addIfDoesNotExistPrice(price)));

    console.log(results, 'results');
    return results;
  }

  static getGroupIds(groupName) {
    return dbTools.findByReturningColumns('items', groupName);
  }

  static getGroupIdNames(id) {
    return eveTechAPI.getMarketGroup(parseInt(id, 10));
  }

  static addGroup(tableName, group) {
    return dbTools.addGroup(tableName, group);
  }

  async getAndAdd(id, tableName) {
    const group = await this.getGroupIdNames(id);
    const { types } = group;
    group.types = JSON.stringify(types);
    return this.addGroup(tableName, group);
  }

  async addGroupIds(from, to) {
    const groups = await this.getGroupIds(from);

    const results = await aigle.map(groups, group => rateLimiter
      .schedule(() => this.getAndAdd(group[from], to)));

    return results;
  }
}

export default MarketWorker;
