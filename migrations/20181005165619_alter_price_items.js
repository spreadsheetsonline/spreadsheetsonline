
exports.up = function (knex, Promise) {
    return knex.schema.table('items', table => {
        table.dropColumn('price');
        table.integer('adjusted_price');
        table.integer('average_price');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('items', table => {
        table.dropColumn("adjusted_price");
        table.dropColumn("average_price");
        table.json("price");
    });
};
