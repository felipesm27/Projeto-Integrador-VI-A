const { Monitor } = require('../models');

// Criar um novo monitor
const criarMonitor = async (req, res) => {
  try {
    const { nome, sobrenome, telefone } = req.body;

    await Monitor.create({ nome, sobrenome, telefone });

    // Redireciona para a página de lista de monitores após adicionar
    res.redirect('/monitores?success=Monitor criado com sucesso');
  } catch (error) {
    res.redirect('/monitores?error=Erro ao criar monitor');
  }
};

// Listar todos os monitores
const listarMonitores = async (req, res) => {
  try {
    const monitores = await Monitor.findAll();

    let monitorEmEdicao = null;

    // Verificar se há um parâmetro de edição
    if (req.query.editar) {
      monitorEmEdicao = await Monitor.findByPk(req.query.editar);
    }

    // Renderiza a view 'monitores' e passa os dados para ela
    res.render('monitores', {
      monitores: monitores.map(monitor => monitor.get({ plain: true })),
      monitorEmEdicao // Passa o monitor em edição para a view
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar monitores', error });
  }
};


// Atualizar um monitor existente
const atualizarMonitor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, sobrenome, telefone } = req.body;

    const monitor = await Monitor.findByPk(id);
    if (!monitor) {
      return res.status(404).json({ message: 'Monitor não encontrado' });
    }

    monitor.nome = nome;
    monitor.sobrenome = sobrenome;
    monitor.telefone = telefone;
    await monitor.save();

    // Redirecionar com mensagem de sucesso
    res.redirect('/monitores?success=Monitor atualizado com sucesso');
  } catch (error) {
    // Redirecionar com mensagem de erro
    res.redirect('/monitores?error=Erro ao atualizar monitor');
  }
};

// Excluir um monitor
// Excluir um monitor
const excluirMonitor = async (req, res) => {
  try {
    const { id } = req.params;
    const monitor = await Monitor.findByPk(id);

    if (!monitor) {
      return res.status(404).json({ message: 'Monitor não encontrado' });
    }

    await monitor.destroy(); // Exclui o monitor
    // Redirecionar com mensagem de sucesso
    res.status(200).json({ message: 'Monitor excluído com sucesso' });
  } catch (error) {
    // Redirecionar com mensagem de erro
    res.status(500).json({ message: 'Erro ao excluir monitor', error });
  }
};


module.exports = {
  criarMonitor,
  listarMonitores,
  atualizarMonitor,
  excluirMonitor,
};
