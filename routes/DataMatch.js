const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/partite/DataMatch', async (req, res) => {
    try {
        const query = 'SELECT * FROM partite ORDER BY id_partita;';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;