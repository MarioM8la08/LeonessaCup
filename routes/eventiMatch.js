// creare un codice che avendo l'id partita cerca in prestazioni tutti gli eventi rilevanti con quel id al fine di restituire un array di eventi
const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/eventi', async (req, res) => {
    const partitaID = req.query['partitaID'];
    try {
        // fare un join per avere il nome del giocatore da giocatori in valore crescente in base al campo minuto
        const query = "select * from eventi join giocatori on eventi.id_giocatore = giocatori.id_giocatore where id_partita = $1 order by minuto asc";
        const result = await pool.query(query, [partitaID]);
        if (result.rows.length === 0) {
            return res.status(404).send('Squadra not found');
        }
        console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;
