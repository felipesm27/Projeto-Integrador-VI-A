const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Monitor extends Model {}

Monitor.init({
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.CHAR(11),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Monitor',
    tableName: 'monitores',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Monitor;
