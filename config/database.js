const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize('sistema_gerenciamento_alunos', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    charset: 'utf8',
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  logging: true, // Desativa os logs SQL para maior clareza
});

module.exports = sequelize;
