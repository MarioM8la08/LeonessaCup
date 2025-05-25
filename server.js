const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Usa la porta assegnata da Azure oppure 3000 in locale
const port = process.env.PORT || 3000;
app.use(express.json());
const pool = require('./routes/db.js');
const dataTeamRouter = require('./routes/DataTeam.js');
const dataGironiRouter = require('./routes/ClassificaGironi.js');
const dataMatchRouter = require('./routes/DataMatch.js');
const dataGiocatoriRouter = require('./routes/teamGiocatori.js');
const dataStaffRouter = require('./routes/teamStaff.js');
const dataPlayerPage = require('./routes/PlayerPage.js');
const ytMatchs = require('./routes/ytMatchs.js');
const ytMatch = require('./routes/ytMatch.js');
const MatchStat = require('./routes/MatchStat.js');
const eventiMatch = require('./routes/eventiMatch.js');
const adminReg = require('./routes/admin.js');
const modificaClassifica = require('./routes/modificaClassifica.js');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(dataTeamRouter);
app.use(dataGironiRouter);
app.use(dataMatchRouter);
app.use(dataGiocatoriRouter);
app.use(dataStaffRouter);
app.use(dataPlayerPage);
app.use(ytMatchs);
app.use(ytMatch);
app.use(MatchStat);
app.use(eventiMatch);
app.use(adminReg);
app.use(modificaClassifica);
// Gestione richieste a file HTML direttamente
app.get('/*.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});
app.get('/', (req, res) => {
    res.redirect('/chiSiamo');
});
// Gestione singola rout inserimento
app.get('/inserimenti', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'inserimenti.html'));
});
// Per tutte le altre rotte, invia index.html (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Avvio server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
