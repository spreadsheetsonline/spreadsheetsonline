exports.up = function (knex, Promise) {
    return knex.schema.createTable('market_groups', (table) => {
        table.integer('market_group_id');
        table.string('description');
        table.string('name');
        table.integer('parent_group_id');
        table.json('types');
    });
};
 
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('market_groups');
};