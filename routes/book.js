const express = require('express');
const router = express.Router();
const pool = require('./db');
const crypto = require('crypto');
const sendEmail = require('./sendEmail');

function htmlEmail(link){
    //crea un html per l'email con infine un bottone con interno il link di conferma
    return `
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Conferma Prenotazione Leonessa Cup</title>
                <style>
                    .logo {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .logo img {
                        width: 100px;
                    }
                    .logo h1 {
                        font-size: 24px;
                        color: aliceblue;
                    }
                    .main{
                        background-color: #141A33;
                        color: aliceblue;
                        padding: 20px;
                        border-radius: 10px;
                        max-width: 600px;
                        margin: auto;
                        text-align: center;
                    }
                    a{
                    margin-top: 20px;
                    }
                </style>
            <body>
                <div class="main">
                    <div class="logo">
                      <img src="https://res.cloudinary.com/djrlf1tos/image/upload/v1748104650/logo.gif" alt="Logo Leonessa Cup" />
                      <h1>Leonessa Cup</h1>
                    </div>
                    <h1>Conferma la tua prenotazione</h1>
                    <p>Clicca sul bottone qui sotto per confermare la tua prenotazione:</p>
                    <a href="${link}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Conferma Prenotazione</a>
                </div>
            </body>
        </html>
    `;
}

router.post('/api/book', async (req, res) => {
    const { name, surname, email } = req.body;
    console.log(req.body);
    console.log(!name || !surname || !email);
    if (!name || !surname || !email) {
        return res.status(400).json({ message: 'Tutti i campi sono obbligatori.' });
    }

    try {
        const result = await pool.query('SELECT is_open FROM booking_status LIMIT 1');
        const bookingStatus = result.rows; // array di righe

        if (!bookingStatus[0].is_open) {
            return res.status(403).json({ message: 'Prenotazioni chiuse.' });
        }
        console.log('Prenotazioni aperte, procedo con la prenotazione.');

        const token = crypto.randomBytes(20).toString('hex');
        await pool.query(
            'INSERT INTO bookings (name, surname, email, token, confirmed) VALUES ($1, $2, $3, $4, $5)',
            [name, surname, email, token, false]
        );

        const link = `${"https:/leonessacup.live" || 'http://localhost:3000'}/api/confirm/${token}`;
        console.log(`Link di conferma: ${link}`);
        await sendEmail(email, 'Conferma prenotazione Leonessa Cup', htmlEmail(link), true);

        res.json({ message: 'Controlla la tua email per confermare la prenotazione.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Errore del server.' });
    }
});

module.exports = router;