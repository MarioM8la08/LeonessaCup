const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const pool = require('./routes/db.js');

// Serve i file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Gestire richieste specifiche per file HTML
app.get('/*.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});

// API endpoint example
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM squadre');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Catch-all per le route della SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
