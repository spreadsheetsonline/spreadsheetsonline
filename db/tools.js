const knex = require('./knex');
const sampleObject = require('../data/basicObjectRef.json');

const itemTable = {
    addItem(item) {
        return knex('items').insert(item).catch(err => console.log(err));
    },

    checkItem(item) {
        Object.keys(sampleObject)
        .forEach(k => !item.hasOwnProperty(k) ? item[k] = null : null )

        return item
    }
};

module.exports = itemTable;