const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

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
const createEvent = require('./routes/createEvent.js');
const updateEvent = require('./routes/updateMatch.js');
const prestazioni = require('./routes/prestazioni.js');

const bookRoute = require('./routes/book.js');
const confirmRoute = require('./routes/confirm.js');
const checkinRoute = require('./routes/checkin.js');
const adminBookingRoute = require('./routes/adminBooking.js');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.db = pool;
    next();
});

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
app.use(createEvent);
app.use(updateEvent);
app.use(prestazioni);

app.use(bookRoute);
app.use(confirmRoute);
app.use(checkinRoute);
app.use(adminBookingRoute);

// Gestione richieste a file HTML direttamente
app.get('/*.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});
app.get('/', (req, res) => {
    res.redirect('/chiSiamo');
});
// Gestione singola rout inserimento
app.get('/inserimento', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'inserimenti.html'));
});
app.get("/scan", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'scanner.html'));
});
app.get("/logAdmin", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'logAdmin.html'));
});
app.get("/logStaff", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'logStaff.html'));
});
// Per tutte le altre rotte, invia index.html (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Usa la porta assegnata da Azure oppure 3000 in locale
const port = process.env.PORT || 3000;
// Avvio server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
