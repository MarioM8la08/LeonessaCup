const express = require('express');
const router = express.Router();
const pool = require('./db');

router.post('/api/admin/open-booking', async (req, res) => {
    await pool.query('UPDATE booking_status SET is_open = true');
    res.json({ message: 'Prenotazioni aperte.' });
});

router.post('/api/admin/close-booking', async (req, res) => {
    await pool.query('UPDATE booking_status SET is_open = false');
    res.json({ message: 'Prenotazioni chiuse.' });
});

router.post('/api/admin/reset-booking', async (req, res) => {
    await pool.query('DELETE FROM bookings');
    res.json({ message: 'Prenotazioni resettate.' });
});

module.exports = router;