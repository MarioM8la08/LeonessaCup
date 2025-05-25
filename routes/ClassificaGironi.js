const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/classifica/Data', async (req, res) => {
    try {
        const query = 'SELECT\n' +
            '    id_Squadra,\n' +
            '    Nome_Scuola,\n' +
            '    Girone,\n' +
            '    Punti,\n' +
            '    Partite_Giocate,\n' +
            '    Vittorie,\n' +
            '    Pareggi,\n' +
            '    Sconfitte,\n' +
            '    Gol_Fatti,\n' +
            '    Gol_Subiti,\n' +
            '    (Gol_Fatti - Gol_Subiti) as Differenza_Reti,\n' +
            '    RANK() OVER (\n' +
            '        PARTITION BY Girone\n' +
            '        ORDER BY\n' +
            '            Punti DESC,\n' +
            '            (Gol_Fatti - Gol_Subiti) DESC,\n' +
            '            Gol_Fatti DESC\n' +
            '        ) as Posizione\n' +
            'FROM Classifica\n' +
            'ORDER BY Girone, Posizione;\n';
        const result = await pool.query(query);
        res.json(result['rows']);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;