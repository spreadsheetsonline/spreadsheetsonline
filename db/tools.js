const knex = require('../knexfile');

module.exports = {
    addItem(item) {
        return knex('items').insert(item).catch(err => console.log(err))  
    },

    checkItem(item) {
        if (!item) {
            throw new Error("checkItem() did not recieve an argument");
        }

        const stringItem = JSON.stringify(Object.keys(item))
        const itemKeys = JSON.stringify([
            'id', 'name', 'description', 'group_id', 'icon_id',
            'graphic_id', 'adjusted_price', 'average_price', 'market_group_id',
            'mass', 'packaged_volume', 'portion_size', 'published', 'radius', 'type_id',
            'volume', 'capacity', 'dogma_attributes', 'dogma_effects'
        ]);

        if (itemKeys !== stringItem) {
            return false;
        }
    }
};