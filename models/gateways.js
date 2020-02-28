'use strict';
module.exports = (sequelize, DataTypes) => {
    const gateways = sequelize.define('gateways', {
        gw_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        gw_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        gw_address_mac_in_bound: {
            allowNull: true,
            type: DataTypes.STRING
        },
        gw_address_mac_out_bound: {
            allowNull: true,
            type: DataTypes.STRING
        },
        gw_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        gw_ip: {
            allowNull: true,
            type: DataTypes.STRING
        },
        gw_deployment_date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        site_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        gwt_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        configuration_file_id: {
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
        tableName: 'gateways'
    });
    gateways.prototype.fields = [
        'gw_id',
        'gw_label',
        'gw_address_mac_in_bound',
        'gw_address_mac_out_bound',
        'gw_description',
        'gw_ip',
        'gw_deployment_date',
        'site_id',
        'gwt_id',
        'configuration_file_id',
        'active'
    ];
    gateways.prototype.fieldsSearchMetas = [
        'gw_label',
        'gw_address_mac_in_bound',
        'gw_address_mac_out_bound',
        'gw_description',
        'gw_ip',
        'gw_deployment_date'
    ];
    const sites = require('./sites');
    const gateway_types = require('./gateway_types');
    const efiles = require('./efiles');

    gateways.prototype.modelIncludes = {
        'sites': {
            model: sites
        },
        'gateway_types': {
            model: gateway_types
        },
        'efiles': {
            model: efiles
        }
    };
    gateways.associate = function (models) {
        gateways.belongsTo(models.sites, {
            foreignKey: 'site_id'
        }); // Will add site_id to gateway
        gateways.belongsTo(models.gateway_types, {
            foreignKey: 'gwt_id'
        }); // Will add gwt_id to gateway
        gateways.belongsTo(models.efiles, {
            foreignKey: 'configuration_file_id'
        });
    };
    return gateways;
};
