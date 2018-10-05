
exports.up = function (knex, Promise) {
    return knex.schema.createTable('items', (table) => {
        table.increments('id');
        table.string('name');
        table.text('description');
        table.integer('group_id');
        table.integer('icon_id');
        table.integer('market_group_id');
        table.integer('mass');
        table.integer('package_volume');
        table.integer('portion_size');
        table.boolean('published');
        table.integer('radius');
        table.integer('type_id');
        table.integer('volume');
        table.integer('capacity');
        table.json('price');
        table.json('dogma_attributes');
        table.json('dogma_effects');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('items');
};
