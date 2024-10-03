const express = require('express');
const router = express.Router();
const { criarAluno, listarAlunos, atualizarAluno, excluirAluno } = require('../controllers/alunoController');

// Rota para listar alunos e mostrar o formulário de cadastro
router.get('/', listarAlunos);

// Rota para criar um novo aluno
router.post('/', criarAluno);

// Rota para atualizar um aluno
router.put('/:id', atualizarAluno);

// Rota para excluir um aluno
router.delete('/:id', excluirAluno);

module.exports = router;
