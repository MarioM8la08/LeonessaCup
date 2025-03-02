const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/player/Data', async (req, res) => {
    const squadraID = req.query['playerID'];
    try {
        const query = 'SELECT giocatori.id_giocatore,\n' +
            '       giocatori.nome_cognome,\n' +
            '       giocatori.anno_scolastico,\n' +
            '       giocatori.numero_maglia,\n' +
            '       giocatori.ruolo,\n' +
            '       SUM(prestazioni.gol) AS total_gol,\n' +
            '       SUM(prestazioni.assist) AS total_assist,\n' +
            '       SUM(prestazioni.cartellini_gialli) AS total_cartellini_gialli,\n' +
            '       SUM(prestazioni.cartellini_rossi) AS total_cartellini_rossi,\n' +
            '       SUM(prestazioni.minuti_giocati) AS total_minuti_giocati\n' +
            'FROM giocatori\n' +
            '         JOIN prestazioni ON giocatori.id_giocatore = prestazioni.id_giocatore\n' +
            'WHERE giocatori.id_giocatore = $1\n' +
            'GROUP BY giocatori.id_giocatore, giocatori.nome_cognome, giocatori.anno_scolastico, giocatori.numero_maglia, giocatori.ruolo;';
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