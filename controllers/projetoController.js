const { Projeto, Monitor, Aluno } = require('../models');

// Função para criar um novo projeto
const criarProjeto = async (req, res) => {
  try {
    const { nome, descricao, data_inicio, periodo, monitor_id, alunos_ids } = req.body;

    // Criar o projeto
    const novoProjeto = await Projeto.create({ 
      nome, 
      descricao, 
      data_inicio, 
      periodo, 
      monitor_id 
    });

    // Associar alunos ao projeto
    if (alunos_ids && alunos_ids.length > 0) {
      const alunosSelecionados = await Aluno.findAll({ where: { id: alunos_ids } });
      await novoProjeto.setAlunos(alunosSelecionados);
    }

    // Redirecionar para a página de lista de projetos
    res.redirect('/projetos?success=Projeto criado com sucesso');
  } catch (error) {
    res.redirect('/projetos?error=Erro ao criar projeto');
  }
};

// Função para listar todos os projetos
const listarProjetos = async (req, res) => {
  try {
    const projetos = await Projeto.findAll({
      include: [Monitor, Aluno],
    });

    const monitores = await Monitor.findAll();
    const alunos = await Aluno.findAll();

    // Inicializa a variável para o projeto em edição
    let projetoEmEdicao = null;

    // Verifica se há um parâmetro de edição na URL
    if (req.query.editar) {
      projetoEmEdicao = await Projeto.findByPk(req.query.editar, {
        include: [Monitor, Aluno], // Inclui monitores e alunos ao buscar o projeto
      });
    }

    // Renderiza a view com os projetos, monitores, alunos e o projeto em edição
    res.render('projetos', {
      projetos: projetos.map(projeto => projeto.get({ plain: true })),
      monitores: monitores.map(monitor => monitor.get({ plain: true })),
      alunos: alunos.map(aluno => aluno.get({ plain: true })),
      projetoEmEdicao // Passa o projeto em edição para a view
    });
  } catch (error) {
    res.redirect('/projetos?error=Erro ao listar projetos');
  }
};

// Função para atualizar um projeto
const atualizarProjeto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, data_inicio, periodo, monitor_id, alunos_ids } = req.body;

    const projeto = await Projeto.findByPk(id);
    if (!projeto) {
      return res.redirect('/projetos?error=Projeto não encontrado');
    }

    projeto.nome = nome;
    projeto.descricao = descricao;
    projeto.data_inicio = data_inicio;
    projeto.periodo = periodo;
    projeto.monitor_id = monitor_id;
    await projeto.save();

    if (alunos_ids && alunos_ids.length > 0) {
      const alunosSelecionados = await Aluno.findAll({ where: { id: alunos_ids } });
      await projeto.setAlunos(alunosSelecionados);
    } else {
      await projeto.setAlunos([]);
    }

    res.redirect('/projetos?success=Projeto atualizado com sucesso');
  } catch (error) {
    res.redirect('/projetos?error=Erro ao atualizar projeto');
  }
};

// Função para excluir um projeto
const excluirProjeto = async (req, res) => {
  try {
      const { id } = req.params;

      // Encontrar o projeto pelo ID
      const projeto = await Projeto.findByPk(id);
      if (!projeto) {
          return res.status(404).json({ message: 'Projeto não encontrado' });
      }

      // Excluir o projeto
      await projeto.destroy();

      // Retornar sucesso em formato JSON
      res.status(200).json({ message: 'Projeto excluído com sucesso' });
  } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      res.status(500).json({ message: 'Erro ao excluir projeto', error });
  }
};



// Exportar as funções do controlador
module.exports = {
  criarProjeto,
  listarProjetos,
  atualizarProjeto,
  excluirProjeto,
};
