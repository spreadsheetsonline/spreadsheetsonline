
exports.up = function(knex, Promise) {
  return knex.schema.table('items', table => {
      table.integer('graphic_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', table => {
      table.dropColumn('graphic_id')
  })
};
