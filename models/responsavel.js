const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');

class Responsavel extends Model {}

Responsavel.init({
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    parentesco: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.CHAR(11),
        allowNull: true,
    },
    aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize,
    modelName: 'Responsavel',
    tableName: 'responsaveis',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Relacionamento: Um responsável pertence a um aluno
Responsavel.belongsTo(Aluno, { foreignKey: 'aluno_id' });

module.exports = Responsavel;
