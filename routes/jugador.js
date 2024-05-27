const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugador');

router.get('/jugadores', async (req, res) => {
    try {
        let jugadores = await jugadorController.getJugadores();
        res.json(jugadores);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/jugador/:id', async (req, res) => {
    try {
        let jugador = await jugadorController.getJugadorById(req.params.id);
        res.json(jugador);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.post('/jugador', async (req, res) => {
    try {
        let jugador = await jugadorController.addJugador(req.body.jugadorName, req.body.edad);
        res.json(jugador);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.put('/jugadorBuy', async (req, res) => {
    try {
        let jugador = await jugadorController.buyBoleto(req.body.jugadorId, req.body.amount);
        res.json(jugador);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

module.exports = router;