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
            WHERE id = ? 
              AND email = ? 
              AND confirmed = true 
              AND used = false
        `;
        console.log(`QR Code ricevuto: id=${id}, email=${email}`);
        const [rows] = await pool.query(query, [id, email]);
        console.log(`QR Code ricevuto: id2=${id}, email2=${email}`);
        if (rows.length === 0) return res.status(400).json({ message: 'QR non valido o già usato.' });

        await pool.query('UPDATE bookings SET used = true WHERE id = ?', [id]);
        res.json({ message: 'Accesso confermato.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Errore server.' });
    }
});

module.exports = router;