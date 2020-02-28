'use strict';
module.exports = (sequelize, DataTypes) => {
    const lines = sequelize.define('lines', {
        line_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        line_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        site_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        line_description: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        direct_production_mode_id : {
            allowNull: true,
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    }, {
        tableName: 'lines'
    });
    lines.prototype.fields = [
        'line_id',
        'line_label',
        'site_id',
        'line_description',
        'active',
        'direct_production_mode_id'
    ];
    lines.prototype.fieldsSearchMetas = [
        'line_label',
        'line_description',
        'direct_production_mode_id'
    ];
    const sites = require('./sites');
    const direct_production_modes= require('./direct_production_modes')

    lines.prototype.modelIncludes = {
        'sites': {
            model: sites
        },
        'direct_production_modes': {
            model: direct_production_modes
        }
    };

    lines.associate = function (models) {
        lines.belongsTo(models.sites, {
            foreignKey: 'site_id'
        });
        lines.belongsTo(models.direct_production_modes, {
            foreignKey: 'direct_production_mode_id'
        })
    };
    return lines;
};
