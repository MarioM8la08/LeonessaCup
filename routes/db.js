const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LeonessaCup',
    password: 'M8laMM11116913!',
    port: 5432,
});

module.exports = pool;