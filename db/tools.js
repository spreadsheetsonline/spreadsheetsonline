const knex = require('./knex');
const sampleObject = require('../data/basicObjectRef.json');

const itemTable = {
    addItem(item) {
        console.log('ITEM: ', item.name)
        item = this.checkItem(item)

        return knex('items').insert(item).catch(err => {console.log(err); console.log(item)});
    },

    checkItem(item) {
        Object.keys(sampleObject)
            .forEach(k => {
                !item.hasOwnProperty(k) ? item[k] = null : null
            })

        return item
    },

    findBy(tableName, columnName , columnValue) {
        return knex.select(columnName).from(tableName)
        .where(columnName, columnValue).then(data => data).catch(err => err)
    }
};

module.exports = itemTable;