const Aluno = require('./aluno');
const Responsavel = require('./responsavel');
const DadosEscolares = require('./dadosEscolares');
const Projeto = require('./projeto');
const Monitor = require('./monitor');
const AlunoProjeto = require('./alunoProjeto');

// Relacionamento Aluno - Responsável (1:N)
Aluno.hasMany(Responsavel, { onDelete: 'CASCADE', foreignKey: 'aluno_id' });
Responsavel.belongsTo(Aluno, { foreignKey: 'aluno_id' });

// Relacionamento Aluno - DadosEscolares (1:1)
Aluno.hasOne(DadosEscolares, { onDelete: 'CASCADE', foreignKey: 'aluno_id' });
DadosEscolares.belongsTo(Aluno, { foreignKey: 'aluno_id' });

// Relacionamento Projeto - Monitor (1:N)
Monitor.hasMany(Projeto, { onDelete: 'SET NULL', foreignKey: 'monitor_id' });
Projeto.belongsTo(Monitor, { foreignKey: 'monitor_id' });

// Relacionamento Aluno - Projeto (N:M) com tabela intermediária
Aluno.belongsToMany(Projeto, { through: AlunoProjeto, foreignKey: 'aluno_id' });
Projeto.belongsToMany(Aluno, { through: AlunoProjeto, foreignKey: 'projeto_id' });

module.exports = {
  Aluno,
  Responsavel,
  DadosEscolares,
  Projeto,
  Monitor,
  AlunoProjeto,
};
