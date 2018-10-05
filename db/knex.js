const config = {
    client: 'pg',
    version: '10',
    connection: {
        host: '127.0.0.1',
        user: 'masakistewart',
        password: process.env.eve_test_password,
        database: 'eve_test'
    },
    migrations: {
        tableName: 'knex_migrations'
    }
}

module.exports = require('knex')(config);