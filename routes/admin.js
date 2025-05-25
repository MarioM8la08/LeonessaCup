const express = require('express');
const router = express.Router();
const pool = require('./db.js');
router.get('/api/logAdmin', async (req, res) => {
    try {
        // /api/logAdmin?idAdmin=${idAdmin}&passwordAdmin=${passwordAdmin}
        const idAdmin = req.query['idAdmin'];
        const passwordAdmin = req.query['passwordAdmin'];
        // registrazioneAdmin
        const query = 'SELECT * FROM public."Admin" WHERE id = $1 AND password = $2 ORDER BY id DESC';
        const result = await pool.query(query, [idAdmin, passwordAdmin]);
        console.log(result.rows.length > 0);
        return res.json(result.rows.length > 0);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;