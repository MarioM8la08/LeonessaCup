const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: './pass.env' });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootG2.crt.pem'),
        rejectUnauthorized: false
    }
});

module.exports = pool;