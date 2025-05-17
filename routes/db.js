const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: 'adminleonessa',
    host: 'leonessadb.postgres.database.azure.com',
    database: 'LeonessaCup',
    password: 'M8laMM11116913!',
    port: 5432,
    ssl: {

        rejectUnauthorized: false // <-- IGNORA la verifica del certificato (solo per testing)
    }
});

module.exports = pool;
