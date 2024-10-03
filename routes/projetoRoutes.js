const express = require('express');
const router = express.Router();
const { criarProjeto, listarProjetos, atualizarProjeto, excluirProjeto } = require('../controllers/projetoController');

// Rota para listar projetos e mostrar o formulário de cadastro
router.get('/', listarProjetos);

// Rota para criar um novo projeto
router.post('/', criarProjeto);

// Rota para atualizar um projeto
router.put('/:id', atualizarProjeto);

// Rota para excluir um projeto
router.delete('/:id', excluirProjeto);

module.exports = router;
