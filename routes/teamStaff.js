const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/squadre/Staff', async (req, res) => {
    const squadraID = req.query['squadraID'];
    try {
        const query = 'SELECT * from staff where id_squadra = $1';
        const result = await pool.query(query, [squadraID]);
        if (result.rows.length === 0) {
            return res.status(404).send('Squadra not found');
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;