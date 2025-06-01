const express = require('express');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const router = express.Router();
const pool = require('./db');
const sendEmail = require('./sendEmail');
const fs = require('fs');
const generateTicketPDF = require('./generateTicketPDF');
const htmlConferma = fs.readFileSync('conferma.html', 'utf8');
const htmlErrore = fs.readFileSync('errore.html', 'utf8');
const bigliettoTemplate = fs.readFileSync('biglietto.html', 'utf8');
router.get('/api/confirm/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const { rows } = await pool.query(
            'SELECT * FROM bookings WHERE token = $1 AND confirmed = false',
            [token]
        );

        if (rows.length === 0) {
            return res.status(400).send(htmlErrore);
        }
        const booking = rows[0];
        const qrData = `${booking.id}|${booking.email}`;
        const qrImage = await QRCode.toDataURL(qrData);
        const ticketHtml = fs.readFileSync('ticketTemplate.html', 'utf8')
            .replace('{{name}}',booking.name + ' ' + booking.surname)
            .replace('{{date}}', new Date().toLocaleDateString())
            .replace('{{qrImage}}', qrImage);

        const pdfBuffer = await generateTicketPDF(ticketHtml);

        await pool.query(
            'UPDATE bookings SET confirmed = true, qr_code = $1 WHERE id = $2',
            [qrData, booking.id]
        );

        await sendEmail(
            booking.email,
            'Il tuo biglietto per la Leonessa Cup',
            bigliettoTemplate,
            true,
            {
                filename: 'biglietto.pdf',
                content: pdfBuffer
            }
        );

        res.send(htmlConferma);
    } catch (err) {
        console.error(err);
        res.status(500).send('Errore del server.');
    }
});

module.exports = router;
