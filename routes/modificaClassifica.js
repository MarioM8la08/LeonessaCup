const express = require('express');
const router = express.Router();
const pool = require('./db.js');

router.post('/api/classifica/update', async (req, res) => {
    try {
        console.log(`Received data: ${JSON.stringify(req.body)}`);

        // Validate the request body
        const { id_squadra, punti, partite_giocate, vittorie, pareggi, sconfitte, gol_fatti, gol_subiti } = req.body;
        if (!id_squadra) {
            return res.status(400).json({ error: 'The field "id_squadra" is required.' });
        }

        // Update the classifica
        const query = `
            UPDATE Classifica
            SET
                Punti = $1,
                Partite_Giocate = $2,
                Vittorie = $3,
                Pareggi = $4,
                Sconfitte = $5,
                Gol_Fatti = $6,
                Gol_Subiti = $7
            WHERE
                id_squadra = $8
        `;
        await pool.query(query, [punti, partite_giocate, vittorie, pareggi, sconfitte, gol_fatti, gol_subiti, id_squadra]);

        res.status(200).json({ message: 'Classifica updated successfully' });
    } catch (err) {
        console.error('Error updating classifica:', err.stack);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;