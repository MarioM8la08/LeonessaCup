const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/player/Data', async (req, res) => {
    const squadraID = req.query['playerID'];
    try {
        const query = 'SELECT giocatori.id_giocatore,\n' +
            '       giocatori.id_squadra,\n' +
            '       giocatori.nome_cognome,\n' +
            '       giocatori.anno_scolastico,\n' +
            '       giocatori.numero_maglia,\n' +
            '       giocatori.ruolo,\n' +
            '       squadre.nome_scuola,\n' +
            '       COALESCE(SUM(prestazioni.gol), 0) AS total_gol,\n' +
            '       COALESCE(SUM(prestazioni.assist), 0) AS total_assist,\n' +
            '       COALESCE(SUM(prestazioni.cartellini_gialli), 0) AS total_cartellini_gialli,\n' +
            '       COALESCE(SUM(prestazioni.cartellini_rossi), 0) AS total_cartellini_rossi,\n' +
            '       COALESCE(SUM(prestazioni.minuti_giocati), 0) AS total_minuti_giocati,\n' +
            '       COALESCE(SUM(CASE WHEN prestazioni.titolare THEN 1 ELSE 0 END), 0) AS total_titolare_true,\n' +
            '       COALESCE(SUM(CASE WHEN prestazioni.titolare THEN 0 ELSE 1 END), 0) AS total_titolare_false\n' +
            'FROM giocatori\n' +
            '         LEFT JOIN prestazioni ON giocatori.id_giocatore = prestazioni.id_giocatore\n' +
            '         LEFT JOIN squadre ON giocatori.id_squadra = squadre.id_squadra\n' +
            'WHERE giocatori.id_giocatore = $1\n' +
            'GROUP BY giocatori.id_giocatore, giocatori.nome_cognome, giocatori.anno_scolastico, giocatori.numero_maglia, giocatori.ruolo, squadre.nome_scuola;';
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