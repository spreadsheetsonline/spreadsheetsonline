const knex = require('./knex');
const sampleObject = require('../data/basicObjectRef.json');

const itemTable = {
    addItem(item) {
        item = this.checkItem(item)
        return knex('items').insert(item).catch(err => err);
    },

    checkItem(item) {
        Object.keys(sampleObject)
            .forEach(k => {
                !item.hasOwnProperty(k) ? item[k] = null : null
            })

        return item
    },

    findBy(tableName, columnName , value) {
        return knex.select('type_id').from(tableName)
        .where('type_id', type_id)
    }
};

module.exports = itemTable;