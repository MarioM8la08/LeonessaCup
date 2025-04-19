const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const pool = require('./routes/db.js');
const dataTeamRouter = require('./routes/DataTeam.js');
const dataGironiRouter = require('./routes/ClassificaGironi.js');
const dataMatchRouter = require('./routes/DataMatch.js');
const dataGiocatoriRouter = require('./routes/teamGiocatori.js');
const dataStaffRouter = require('./routes/teamStaff.js');
const dataPlayerPage = require('./routes/PlayerPage.js');
const ytMatch = require('./routes/ytMatch.js');
const MatchStat = require('./routes/MatchStat.js');
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));
app.use(dataTeamRouter);
app.use(dataGironiRouter);
app.use(dataMatchRouter);
app.use(dataGiocatoriRouter);
app.use(dataStaffRouter);
app.use(dataPlayerPage);
app.use(cors());
app.use(ytMatch);
app.use(MatchStat);

app.get('/*.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
