const dotenv = require('dotenv');
const PROCESS = dotenv.config()
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: PROCESS.parsed.PRO_DB_HOST,
        user: PROCESS.parsed.PRO_DB_USER,
        password: PROCESS.parsed.PRO_DB_PASSWORD,
        database: PROCESS.parsed.PRO_DB_NAME,
        port: PROCESS.parsed.PRO_DB_PORT,
    },
    pool: { min: 0, max: 10 },
});

module.exports = knex;
