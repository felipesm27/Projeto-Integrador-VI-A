const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Monitor = require('./Monitor');

class Projeto extends Model {}

Projeto.init({
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    periodo: {
        type: DataTypes.ENUM('Manhã', 'Tarde', 'Noite'),
        allowNull: false,
    },
    monitor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Monitor,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}, {
    sequelize,
    modelName: 'Projeto',
    tableName: 'projetos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Relacionamento: Um projeto pertence a um monitor
Projeto.belongsTo(Monitor, { foreignKey: 'monitor_id' });

module.exports = Projeto;
