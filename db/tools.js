const knex = require('./knex');
const sampleObject = require('../data/basicObjectRef.json');

module.exports = {
    addItem(item) {
        return knex('items').insert(item).catch(err => console.log(err));
    },

    checkItem(item) {
        const stringItem = JSON.stringify(Object.keys(item));
        const itemKeys = JSON.stringify(sampleObject);

        if (itemKeys !== stringItem) {
            return false;
        };
    }
};