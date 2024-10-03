const { Aluno, Responsavel } = require('../models');
const { Op } = require('sequelize');

// Criar um novo aluno
const criarAluno = async (req, res) => {
  try {
    const { nome, sobrenome, telefone, genero, etnia, data_nascimento } = req.body;

    await Aluno.create({ nome, sobrenome, telefone, genero, etnia, data_nascimento });

    // Passar a mensagem de sucesso via URL
    res.redirect('/alunos?success=Aluno criado com sucesso');
  } catch (error) {
    // Passar a mensagem de erro via URL
    res.redirect('/alunos?error=Erro ao criar aluno');
  }
};

// Listar todos os alunos e fornecer aluno para edição
const listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      include: {
        model: Responsavel,
        attributes: ['nome', 'sobrenome'],
      },
    });

    // Verifica se há um aluno para edição com base no query string ?editar=<id>
    let alunoEmEdicao = null;
    if (req.query.editar) {
      alunoEmEdicao = await Aluno.findByPk(req.query.editar);
    }

    res.render('alunos', {
      alunos: alunos.map(aluno => aluno.get({ plain: true })),
      alunoEmEdicao: alunoEmEdicao ? alunoEmEdicao.get({ plain: true }) : null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar alunos', error });
  }
};

// Atualizar um aluno existente
const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, sobrenome, telefone, genero, etnia, data_nascimento } = req.body;

    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Atualizar os dados do aluno
    aluno.nome = nome;
    aluno.sobrenome = sobrenome;
    aluno.telefone = telefone;
    aluno.genero = genero;
    aluno.etnia = etnia;
    aluno.data_nascimento = data_nascimento;
    await aluno.save();

    // Redirecionar com mensagem de sucesso
    res.redirect('/alunos?success=Aluno atualizado com sucesso');
  } catch (error) {
    res.redirect('/alunos?error=Erro ao atualizar aluno');
  }
};


// Excluir um aluno
const excluirAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    await aluno.destroy();
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir aluno', error });
  }
};

module.exports = {
  criarAluno,
  listarAlunos,
  atualizarAluno,
  excluirAluno,
};
