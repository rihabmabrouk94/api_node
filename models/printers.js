'use strict';
module.exports = (sequelize, DataTypes) => {
    const printers = sequelize.define('printers', {
        printer_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        printer_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        printer_ip: {
            allowNull: true,
            type: DataTypes.STRING
        },
        printer_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        printer_status: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        printer_deployed: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        printer_uptime: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        printer_configuration_file_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        printer_tag: {
            allowNull: true,
            type: DataTypes.STRING
        },
        port: {
            allowNull: true,
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
    printers.prototype.fields = [
        'printer_id',
        'printer_label',
        'printer_ip',
        'printer_description',
        'printer_status',
        'printer_deployed',
        'printer_uptime',
        'printer_configuration_file_id',
        'printer_tag',
        'port',
        'active'
    ];

    printers.prototype.fieldsSearchMetas = [
        'printer_label',
        'printer_ip',
        'printer_description',
        'printer_status',
        'printer_deployed',
        'printer_uptime',
        'printer_tag',
        'port'
    ];
    const efiles = require('./efiles');

    printers.prototype.modelIncludes = {
        'efiles': {
            model: efiles
        }
    };
    printers.associate = function (models) {
        printers.belongsTo(models.efiles, {
            foreignKey: 'printer_configuration_file_id'
        });
    };
    return printers;
};
