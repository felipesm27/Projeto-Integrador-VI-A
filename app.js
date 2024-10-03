const express = require('express');
const sequelize = require('./config/database');
const app = express(); 
const port = 3000;

// Importando os modelos
const Aluno = require('./models/Aluno');
const Responsavel = require('./models/Responsavel');
const DadosEscolares = require('./models/DadosEscolares');
const Monitor = require('./models/Monitor');
const Projeto = require('./models/Projeto');
const AlunoProjeto = require('./models/AlunoProjeto');

// Relacionamentos de Aluno
Aluno.hasOne(DadosEscolares, { foreignKey: 'aluno_id' });
Aluno.hasMany(Responsavel, { foreignKey: 'aluno_id' });
Aluno.belongsToMany(Projeto, { through: AlunoProjeto, foreignKey: 'aluno_id' });

// Relacionamentos de Responsável
Responsavel.belongsTo(Aluno, { foreignKey: 'aluno_id' });

// Relacionamentos de Dados Escolares
DadosEscolares.belongsTo(Aluno, { foreignKey: 'aluno_id' });

// Relacionamentos de Projeto
Projeto.belongsToMany(Aluno, { through: AlunoProjeto, foreignKey: 'projeto_id' });
Projeto.belongsTo(Monitor, { foreignKey: 'monitor_id' });

// Relacionamentos de Monitor
Monitor.hasMany(Projeto, { foreignKey: 'monitor_id' });

// Configurar o EJS como view engine
app.set('view engine', 'ejs');

// Configurar o middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Importando as rotas
const alunoRoutes = require('./routes/alunoRoutes');
const responsavelRoutes = require('./routes/responsavelRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const monitorRoutes = require('./routes/monitorRoutes');

// Importando o controller da página inicial
const { renderHomePage } = require('./controllers/homeController');

const methodOverride = require('method-override');

// Middleware para sobrescrever métodos
app.use(methodOverride('_method'));

// Configurando as rotas
app.use('/alunos', alunoRoutes);
app.use('/responsaveis', responsavelRoutes);
app.use('/projetos', projetoRoutes);
app.use('/monitores', monitorRoutes);

// Usar o controller da página inicial na rota raiz
app.get('/', renderHomePage); // Agora, usa o controller renderHomePage para a rota principal

// Conexão com o banco de dados e sincronização dos modelos
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });
