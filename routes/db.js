const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: 'adminleonessa',
    host: '161.35.20.160',
    database: 'LeonessaCup',
    password: 'LSC2025_11116913!',
    port: 5432,
    ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootG2.crt.pem'),
        rejectUnauthorized: false
    }
});

module.exports = pool;
