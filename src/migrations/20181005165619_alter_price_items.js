exports.up = function alterItemsPrice(knex) {
  return knex.schema.table('items', (table) => {
    table.dropColumn('price');
    table.integer('adjusted_price');
    table.integer('average_price');
  });
};

exports.down = function revertItemsPrice(knex) {
  return knex.schema.table('items', (table) => {
    table.dropColumn('adjusted_price');
    table.dropColumn('average_price');
    table.json('price');
  });
};
