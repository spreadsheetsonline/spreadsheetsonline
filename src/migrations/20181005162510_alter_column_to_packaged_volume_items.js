exports.up = function wipePackagedVolue(knex) {
  return knex.schema.table('items', (table) => {
    table.dropColumn('package_volume');
    table.integer('packaged_volume');
  });
};

exports.down = function revertPackagedVolue(knex) {
  return knex.schema.table('items', (table) => {
    table.integer('package_volume');
    table.dropColumn('packaged_volume');
  });
};
