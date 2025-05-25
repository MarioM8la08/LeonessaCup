const express = require('express');
const router = express.Router();
const pool = require('./db.js');

router.post('/api/evento/create', async (req, res) => {
    const { evento, id_giocatore, minuto, id_partita } = req.body;
    console.log(`Creating event: ${evento}, Player ID: ${id_giocatore}, Minute: ${minuto}, Match ID: ${id_partita}`);
    try {
        // Retrieve the current maximum key value
        const maxKeyResult = await pool.query('SELECT MAX(key) AS max_key FROM public.eventi');
        const maxKey = maxKeyResult.rows[0].max_key || 0; // Default to 0 if no rows exist
        const newKey = maxKey + 1;

        // Insert the new event with the calculated key
        const query = 'INSERT INTO public.eventi (key, evento, id_giocatore, minuto, id_partita) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(query, [newKey, evento, id_giocatore, minuto, id_partita]);

        res.status(201).json({ message: 'Event created successfully', key: newKey });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;