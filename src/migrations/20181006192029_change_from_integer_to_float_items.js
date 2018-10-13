exports.up = function floatConversion(knex) {
  return knex.schema.alterTable('items', (table) => {
    table.decimal('group_id').alter();
    table.decimal('icon_id').alter();
    table.decimal('market_group_id').alter();
    table.decimal('mass').alter();
    table.decimal('packaged_volume').alter();
    table.decimal('portion_size').alter();
    table.decimal('radius').alter();
    table.decimal('type_id').alter();
    table.decimal('volume').alter();
    table.decimal('capacity').alter();
    table.decimal('adjusted_price').alter();
    table.decimal('average_price').alter();
  });
};

exports.down = function revertFloatConversion(knex) {
  return knex.schema.alterTable('items', (table) => {
    table.integer('group_id').alter();
    table.integer('icon_id').alter();
    table.integer('market_group_id').alter();
    table.integer('mass').alter();
    table.integer('packaged_volume').alter();
    table.integer('portion_size').alter();
    table.integer('radius').alter();
    table.integer('type_id').alter();
    table.integer('volume').alter();
    table.integer('capacity').alter();
    table.integer('adjusted_price').alter();
    table.integer('average_price').alter();
  });
};
