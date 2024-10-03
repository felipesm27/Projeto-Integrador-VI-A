const { Aluno, Responsavel, Projeto, Monitor } = require('../models');

// Função para renderizar a página inicial
const renderHomePage = async (req, res) => {
  try {
    const totalAlunos = await Aluno.count();
    const totalResponsaveis = await Responsavel.count();
    const totalProjetos = await Projeto.count();
    const totalMonitores = await Monitor.count();

    // Renderizar a view 'index' e passar as contagens para a página
    res.render('index', {
      totalAlunos,
      totalResponsaveis,
      totalProjetos,
      totalMonitores,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar a página inicial', error });
  }
};

module.exports = {
  renderHomePage
};
