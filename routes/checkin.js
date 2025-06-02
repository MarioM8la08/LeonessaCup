const express = require('express');
const router = express.Router();
const pool = require('./db');

router.post('/api/checkin', async (req, res) => {
    const { qr } = req.body;
    if (!qr) return res.status(400).json({ message: 'QR mancante.' });

    const [id, email] = qr.split('|');
    try {
        const query = `
            SELECT *
            FROM bookings
            WHERE id = $1
              AND email = $2
              AND confirmed = true
              AND used = false
        `;
        const { rows } = await pool.query(query, [id, email]);
        if (rows.length === 0) return res.status(400).json({ message: 'QR non valido o già usato.' });

        await pool.query('UPDATE bookings SET used = true WHERE id = $1', [id]);
        res.json({ message: 'Accesso confermato per ' + rows[0].numero_persone + ' persone.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Errore server.' });
    }
});

module.exports = router;