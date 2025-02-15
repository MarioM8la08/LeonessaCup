const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/squadre/Data', async (req, res) => {
    const squadraID = req.query['squadraID'];
    try {
        const query = 'SELECT \n' +
            '    Nome_Scuola,\n' +
            '    Girone,\n' +
            '    (SELECT COUNT(*) + 1 \n' +
            '     FROM Classifica c2 \n' +
            '     WHERE c2.Girone = c1.Girone \n' +
            '     AND (c2.Punti > c1.Punti \n' +
            '          OR (c2.Punti = c1.Punti \n' +
            '              AND (c2.Gol_Fatti - c2.Gol_Subiti) > (c1.Gol_Fatti - c1.Gol_Subiti)\n' +
            '              OR (c2.Punti = c1.Punti \n' +
            '                  AND (c2.Gol_Fatti - c2.Gol_Subiti) = (c1.Gol_Fatti - c1.Gol_Subiti)\n' +
            '                  AND c2.Gol_Fatti > c1.Gol_Fatti)))) as Posizione,\n' +
            '    Punti,\n' +
            '    Vittorie,\n' +
            '    Gol_Fatti,\n' +
            '    Partite_Giocate\n' +
            'FROM Classifica c1\n' +
            'WHERE id_squadra = $1;\n';
        const result = await pool.query(query, [squadraID]);
        if (result.rows.length === 0) {
            return res.status(404).send('Squadra not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;