// creare un codice che avendo l'id partita cerca in prestazioni tutti gli eventi rilevanti con quel id al fine di restituire un array di eventi
const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/eventi', async (req, res) => {
    const partitaID = req.query['partitaID'];

    // Validate partitaID
    if (!partitaID || isNaN(partitaID)) {
        return res.status(400).send('Invalid or missing partitaID');
    }

    try {
        // Query to fetch events with player names, ordered by minute
        const query = "SELECT * FROM eventi JOIN giocatori ON eventi.id_giocatore = giocatori.id_giocatore WHERE id_partita = $1 ORDER BY minuto ASC";
        const result = await pool.query(query, [partitaID]);

        if (result.rows.length === 0) {
            return res.status(404).send('No events found for the given partitaID');
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;
