const { Responsavel, Aluno } = require('../models');

// Criar um novo responsável
const criarResponsavel = async (req, res) => {
  try {
    const { nome, sobrenome, parentesco, telefone, aluno_id } = req.body;

    // Verificar se o aluno associado existe
    const aluno = await Aluno.findByPk(aluno_id);
    if (!aluno) {
      return res.redirect('/responsaveis?error=Aluno não encontrado');
    }

    await Responsavel.create({ nome, sobrenome, parentesco, telefone, aluno_id });

    // Redireciona para a página de lista de responsáveis após adicionar
    res.redirect('/responsaveis?success=Responsável criado com sucesso');
  } catch (error) {
    res.redirect('/responsaveis?error=Erro ao criar responsável');
  }
};

// Listar todos os responsáveis
const listarResponsaveis = async (req, res) => {
  try {
    const responsaveis = await Responsavel.findAll({ include: Aluno });
    const alunos = await Aluno.findAll(); // Buscar todos os alunos para a lista suspensa

    let responsavelEmEdicao = null;

    // Verificar se há um parâmetro de edição
    if (req.query.editar) {
      responsavelEmEdicao = await Responsavel.findByPk(req.query.editar);
    }

    // Renderizar a view 'responsaveis' e passar os dados dos responsáveis e alunos
    res.render('responsaveis', {
      responsaveis: responsaveis.map(responsavel => responsavel.get({ plain: true })),
      alunos: alunos.map(aluno => aluno.get({ plain: true })),
      responsavelEmEdicao // Passa o responsável em edição para a view
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar responsáveis', error });
  }
};

// Atualizar um responsável existente
const atualizarResponsavel = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, sobrenome, parentesco, telefone, aluno_id } = req.body;

    const responsavel = await Responsavel.findByPk(id);

    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }

    // Verificar se o aluno associado existe
    if (aluno_id) {
      const aluno = await Aluno.findByPk(aluno_id);
      if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }
    }

    responsavel.nome = nome;
    responsavel.sobrenome = sobrenome;
    responsavel.parentesco = parentesco;
    responsavel.telefone = telefone;
    responsavel.aluno_id = aluno_id; // Atualizar a associação com o aluno
    await responsavel.save();

    // Redirecionar com mensagem de sucesso
    res.redirect('/responsaveis?success=Responsável atualizado com sucesso');
  } catch (error) {
    // Redirecionar com mensagem de erro
    res.redirect('/responsaveis?error=Erro ao atualizar responsável');
  }
};


// Excluir um responsável
const excluirResponsavel = async (req, res) => {
  try {
    const { id } = req.params;
    const responsavel = await Responsavel.findByPk(id);

    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }

    await responsavel.destroy(); // Exclui o responsável
    // Redirecionar com mensagem de sucesso
    res.status(200).json({ message: 'Responsável excluído com sucesso' });
  } catch (error) {
    // Redirecionar com mensagem de erro
    res.status(500).json({ message: 'Erro ao excluir responsável', error });
  }
};

module.exports = {
  criarResponsavel,
  listarResponsaveis,
  atualizarResponsavel,
  excluirResponsavel,
};
