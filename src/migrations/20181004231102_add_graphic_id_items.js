exports.up = function addGraphicId(knex) {
  return knex.schema.table('items', (table) => {
    table.integer('graphic_id');
  });
};

exports.down = function removeGraphicId(knex) {
  return knex.schema.table('items', (table) => {
    table.dropColumn('graphic_id');
  });
};
