const Bottleneck = require('bottleneck');
const aigle = require('aigle');
const eveTechAPI = require('./eveTechAPI');
const dbTools = require('../../db/tools');

const rateLimiter = new Bottleneck({ maxConcurrent: 5, minTime: 100 });

async function addIfDoesNotExistPrice(price) {
  const { type_id, average_price, adjusted_price } = price;
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
  return {};
}

async function getItems() {
  const prices = await eveTechAPI.getCurrentPrices();

  const results = await aigle.map(prices, price => rateLimiter.schedule(() => addIfDoesNotExistPrice(price)));

  console.log(results, 'results');
  return results;
}

function getGroupIds(groupName) {
  return dbTools.findByReturningColumns('items', groupName);
}

function getGroupIdNames(id) {
  return eveTechAPI.getMarketGroup(parseInt(id));
}

function addGroup(tableName, group) {
  return dbTools.addGroup(tableName, group);
}

async function getAndAdd(id, tableName) {
  const group = await getGroupIdNames(id);
  const { types } = group;
  group.types = JSON.stringify(types);
  return addGroup(tableName, group);
}

async function addGroupIds(from, to) {
  const groups = await getGroupIds(from);

  const results = await aigle.map(groups, group => rateLimiter.schedule(() => getAndAdd(group[from], to)));

  return results;
}

async function app() {
  return addGroupIds('market_group_id', 'market_groups');
}

app();
