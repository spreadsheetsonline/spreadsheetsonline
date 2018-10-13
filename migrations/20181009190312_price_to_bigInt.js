
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('items', table => {
    //     table.bigInteger('adjusted_price').alter();
    //     table.bigInteger('average_price').alter();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('items', table => {
    //     table.decimal('adjusted_price').alter();
    //     table.decimal('average_price').alter();
    })
};
