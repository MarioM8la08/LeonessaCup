const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/partite/MatchStat', async (req, res) => {
    const partitaID = req.query['partitaID'];
    try {
        const query = "select * from partite where id_partita = $1;";
        const result = await pool.query(query, [partitaID]);
        if (result.rows.length === 0) {
            return res.status(404).send('Squadra not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;