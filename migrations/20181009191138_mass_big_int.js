
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('items', table => {
        table.bigInteger('mass').alter();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('items', table => {
        table.decimal('mass').alter();
    })
};
