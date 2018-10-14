const knex = require('./knex');
// const sampleItem = require('../data/basicObjectRef.json');
const sampleMarketGroupId = require('../data/sampleMarketGroupId.json');

const itemTable = {
  addItem(item) {
    console.log('ITEM: ', item.name);
    const newItem = this.checkItem(item);

    return knex('items')
      .insert(newItem)
      .catch((err) => { throw err; });
  },

  checkObject(obj, sampleObject) {
    return Object.assign(obj, sampleObject);
  },

  findBy(tableName, columnName, columnValue) {
    return knex
      .select(columnName)
      .from(tableName)
      .where(columnName, columnValue)
      .then(data => data)
      .catch(err => err);
  },

  findByReturningColumns(tableName, columnName) {
    return knex
      .distinct(columnName)
      .from(tableName)
      .whereNotNull(columnName)
      .catch((err) => {
        throw err;
      });
  },

  addGroup(tableName, group) {
    console.log('market_group: ', group.name);
    const newGroup = this.checkObject(group, sampleMarketGroupId);
    return knex(tableName)
      .insert(newGroup)
      .catch(err => console.log(err));
  },
};

module.exports = itemTable;
