
exports.up = knex => knex.schema.createTable('groups_table', (table) => {
  table.increments();
});


exports.down = knex => knex.schema.dropTable('groups_table');
