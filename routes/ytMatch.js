const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/partite/ytMatch', async (req, res) => {
    try {
        const query = 'select * from video_partite order by id_partita desc;';
        const result = await pool.query(query);
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