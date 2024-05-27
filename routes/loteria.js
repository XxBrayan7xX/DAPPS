const express = require('express');
const router = express.Router();
const loteriaController = require('../controllers/loteria');

router.get('/loterias', async (req, res) => {
    try {
        let loterias = await loteriaController.getAllLoterias();
        res.json(loterias);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/loteria/:id', async (req, res) => {
    try {
        let loteria = await loteriaController.getLoteriaById(req.params.id);
        res.json(loteria);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.post('/loteria', async (req, res) => {
    try {
        let loteria = await loteriaController.addLoteria(req.body.loteriaName, req.body.creadorId, req.body.creadorName);
        res.json(loteria);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

module.exports = router;