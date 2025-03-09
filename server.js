const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const pool = require('./routes/db.js');
const dataTeamRouter = require('./routes/DataTeam.js');
const dataGironiRouter = require('./routes/ClassificaGironi.js');
const dataMatchRouter = require('./routes/DataMatch.js');
const dataGiocatoriRouter = require('./routes/teamGiocatori.js');
const dataPlayerPage = require('./routes/PlayerPage.js');
const ytMatch = require('./routes/ytMatch.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(dataTeamRouter);
app.use(dataGironiRouter);
app.use(dataMatchRouter);
app.use(dataGiocatoriRouter);
app.use(dataPlayerPage);
app.use(ytMatch);

app.get('/*.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
