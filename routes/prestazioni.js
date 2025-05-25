const express = require('express');
const router = express.Router();
const pool = require('./db.js');

router.post('/api/prestazioni/create', async (req, res) => {
    const {
        id_partita,
        id_giocatore,
        minuti_giocati,
        gol,
        assist,
        cartellini_gialli,
        cartellini_rossi,
        titolare,
        note,
        evento
    } = req.body;

    try {
        const query = `
            INSERT INTO public.prestazioni 
            (id_partita, id_giocatore, minuti_giocati, gol, assist, cartellini_gialli, cartellini_rossi, titolare, note, evento)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        await pool.query(query, [
            id_partita,
            id_giocatore,
            minuti_giocati,
            gol,
            assist,
            cartellini_gialli,
            cartellini_rossi,
            titolare,
            note,
            evento
        ]);

        res.status(201).json({ message: 'Prestazione aggiunta con successo' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Errore del server');
    }
});

module.exports = router;