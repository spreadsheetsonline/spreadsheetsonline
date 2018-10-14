
exports.up = knex => knex.schema.createTable('users_table', (table) => {
  table.increments();
  table.string('username');
  table.string('email');
  table.string('token');
  table.boolean('pwa_subscriber');
  table.dateTime('last_login');
  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('users_table');
