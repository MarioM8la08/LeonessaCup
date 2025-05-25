// gestiamo l'aggiornamento di una partita con solo id partita, gol casa, gol ospite
const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.post('/api/partite/updateMatch', async (req, res) => {
    const { id_partita, gol_casa, gol_ospite } = req.body;
    try {
        const query = 'UPDATE partite SET gol_casa = $1, gol_ospite = $2 WHERE id_partita = $3 RETURNING *';
        const result = await pool.query(query, [gol_casa, gol_ospite, id_partita]);

        if (result.rows.length === 0) {
            return res.status(404).send('Match not found');
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;