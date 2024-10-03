const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AlunoProjeto = sequelize.define('AlunoProjeto', {
  alunoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'alunos',
      key: 'id',
    },
  },
  projetoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'projetos',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'aluno_projeto',
});

module.exports = AlunoProjeto;
