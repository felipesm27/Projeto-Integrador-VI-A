const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Aluno extends Model {}

Aluno.init({
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    telefone: {
        type: DataTypes.CHAR(11),
        allowNull: true,
    },
    genero: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: true,
    },
    etnia: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Aluno',
    tableName: 'alunos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Aluno;
