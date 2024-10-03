const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');

class DadosEscolares extends Model {}

DadosEscolares.init({
    escola: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    alfabetizado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    ano_escolar: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    projeto_imdaz: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'DadosEscolares',
    tableName: 'dados_escolares',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Relacionamento: Um conjunto de dados escolares pertence a um aluno
DadosEscolares.belongsTo(Aluno, { foreignKey: 'aluno_id' });

module.exports = DadosEscolares;
