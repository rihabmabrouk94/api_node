'use strict';
module.exports = (sequelize, DataTypes) => {
    const terminals = sequelize.define('terminals', {
        Terminal_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        Terminal_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Terminal_ip: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Terminal_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Terminal_status: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        Terminal_deployment_date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        Tt_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        Terminal_configuration_file_id: {
            allowNull:true,
            type: DataTypes.INTEGER
        },
        Terminal_uptime: {
            allowNull:true,
            type: DataTypes.INTEGER
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        }
    }, {
        timestamps: false
    }, {
        tableName: 'terminals'
    });
    terminals.prototype.fields = [
        'Terminal_id',
        'Terminal_label',
        'Terminal_ip',
        'Terminal_description',
        'Terminal_status',
        'Terminal_deployment_date',
        'Tt_id',
        'Terminal_configuration_file_id',
        'Terminal_uptime',
        'active'
    ];
    terminals.prototype.fieldsSearchMetas = [
        'Terminal_label',
        'Terminal_ip',
        'Terminal_description',
        'Terminal_status',
        'Terminal_deployment_date'
    ];
    const terminal_types = require('./terminal_types');
    const efiles = require('./efiles');

    terminals.prototype.modelIncludes = {
        'terminal_types': {
            model: terminal_types
        },
        'efiles': {
            model: efiles
        }
    };
    terminals.associate = function (models) {
        terminals.belongsTo(models.terminal_types, {
            foreignKey: 'Tt_id'
        });
        terminals.belongsTo(models.efiles, {
            foreignKey: 'Terminal_configuration_file_id'
        });
    };
    return terminals;
};
