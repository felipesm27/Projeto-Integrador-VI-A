const express = require('express');
const router = express.Router();
const { criarMonitor, listarMonitores, atualizarMonitor, excluirMonitor } = require('../controllers/monitorController');

// Rota para criar um novo monitor
router.post('/', criarMonitor);

// Rota para listar todos os monitores
router.get('/', listarMonitores);

// Rota para atualizar um monitor
router.put('/:id', atualizarMonitor);

// Rota para excluir um monitor
router.delete('/:id', excluirMonitor);

module.exports = router;
