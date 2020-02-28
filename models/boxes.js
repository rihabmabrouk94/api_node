'use strict';
module.exports = (sequelize, DataTypes) => {
    const boxes = sequelize.define('boxes', {
        box_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        box_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        box_macaddress: {
            allowNull: true,
            type: DataTypes.STRING
        },
        mtbox_build_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        box_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        enabled: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        machine_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        break_status: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        break_statusblue: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        manufacturingdate: {
            allowNull: true,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE

        },
        app_versionstatus: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        next_versionid: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        deploymentdate: {
            allowNull: true,
            type: DataTypes.DATE
        },
        site_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        line_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        repair_status: {
            allowNull: true,
            type: DataTypes.STRING
        },
        gw_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        bt_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        box_configuration_file: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        box_uptime: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        box_access_point: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        first_box:{
            allowNull: true,
            type: DataTypes.STRING
        },
        last_box:{
            allowNull: true,
            type: DataTypes.STRING
        },
        box_order:{
            allowNull: true,
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false
    }, {
        tableName: 'boxes'
    });
    boxes.prototype.fields = [
        'box_id',
        'box_label',
        'box_macaddress',
        'mtbox_build_id',
        'box_description',
        'enabled',
        'machine_id',
        'break_status',
        'break_statusblue',
        'manufacturingdate',
        'updated_at',
        'app_versionstatus',
        'next_versionid',
        'deploymentdate',
        'site_id',
        'line_id',
        'repair_status',
        'gw_id',
        'bt_id',
        'box_configuration_file',
        'box_uptime',
        'box_access_point',
        'active',
        'box_order',
        'last_box',
        'first_box'
    ];
    boxes.prototype.fieldsSearchMetas = [
        'box_label',
        'box_description',
    ];
    const lines = require('./lines');
    const machines = require('./machines');
    const box_types = require('./box_types');
    const sites = require('./sites');
    const gateways = require('./gateways');
    const efiles = require('./efiles');
    const mtbox_builds = require('./mtbox_builds');

    boxes.prototype.modelIncludes = {
        'lines': {
            model: lines
        },
        'machines': {
            model: machines
        },
        'box_types': {
            model: box_types
        },
        'sites': {
            model: sites
        },
        'gateways': {
            model: gateways
        },
        'efiles': {
            model: efiles
        },
        'mtbox_builds': {
            model: mtbox_builds
        },
    };
    boxes.associate = function (models) {
        boxes.belongsTo(models.lines, {
            foreignKey: 'line_id'
        });
        boxes.belongsTo(models.machines, {
            foreignKey: 'machine_id'
        });
        boxes.belongsTo(models.box_types, {
            foreignKey: 'bt_id'
        });
        boxes.belongsTo(models.sites, {
            foreignKey: 'site_id'
        });
        boxes.belongsTo(models.gateways, {
            foreignKey: 'gw_id'
        });
        boxes.belongsTo(models.efiles, {
            foreignKey: 'box_configuration_file'
        });
        boxes.belongsTo(models.mtbox_builds, {
            foreignKey: 'mtbox_build_id'
        });
    };
    return boxes;
};
