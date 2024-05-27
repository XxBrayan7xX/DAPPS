const express = require('express');
const router = express.Router();
const boletoController = require('../controllers/boletos');

router.get('/boletos', async (req, res) => {
    try {
        let boletos = await boletoController.getAllBoletos();
        res.json(boletos);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/boleto/:id', async (req, res) => {
    try {
        let boleto = await boletoController.getBoletoById(req.params.id);
        res.json(boleto);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.post('/boleto', async (req, res) => {
    try {
        let boleto = await boletoController.addUser(req.body.token, req.body.jugadorId, req.body.loteriaId);//string memory , uint256 , uint256 
        res.json(boleto);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.get('/boleto/:jugadorId', async (req, res) => {
    try{
        let boleto = await boletoController.getBoletoByJugadorId(req.params.jugadorId);
        res.json(boleto);
    }catch(ex){
        res.status(500).json({message: ex.message});
    }
});

module.exports = router;