const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const pool = require('./routes/db.js');
const dataTeamRouter = require('./routes/DataTeam.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(dataTeamRouter);

app.get('/*.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
