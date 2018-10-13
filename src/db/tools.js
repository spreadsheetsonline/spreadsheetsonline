const knex = require('./knex');
// const sampleItem = require('../data/basicObjectRef.json');
const sampleMarketGroupId = require('../data/sampleMarketGroupId.json');

const itemTable = {
  addItem(item) {
    console.log('ITEM: ', item.name);
    const newItem = this.checkItem(item);

    return knex('items')
      .insert(newItem)
      .catch((err) => {
        console.log(err);
        console.log(newItem);
      });
  },

  checkObject(obj, sampleObject) {
    Object.keys(sampleObject).forEach((k) => {
      !obj.hasOwnProperty(k) ? (obj[k] = null) : null;
    });

    return obj;
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
