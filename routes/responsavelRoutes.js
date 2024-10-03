const express = require('express');
const router = express.Router();
const responsavelController = require('../controllers/responsavelController');

// Definir as rotas para os responsáveis
router.post('/', responsavelController.criarResponsavel);
router.get('/', responsavelController.listarResponsaveis);
router.put('/:id', responsavelController.atualizarResponsavel);
router.delete('/:id', responsavelController.excluirResponsavel);

module.exports = router;  // Certifique-se de que está exportando o `router`
