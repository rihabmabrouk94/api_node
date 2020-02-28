var Sequelize = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
    const machines = sequelize.define('machines', {
        machine_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        machine_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        machine_model: {
            allowNull: true,
            type: DataTypes.STRING
        },
        machine_totalworkinghours: {
            allowNull: true,
            type: DataTypes.FLOAT
        },
        machine_startworkdate: {
            allowNull: true,
            type: DataTypes.DATE
        },
        machine_workingevt: {
            allowNull: true,
            type: DataTypes.STRING
        },
        machine_manufaclifetime: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        machine_productivity: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        machine_totalstitchcount: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        line_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        machine_totaluptime: {
            allowNull: true,
            type: DataTypes.FLOAT
        },
        machine_totaldowntime: {
            allowNull: true,
            type: DataTypes.FLOAT
        },
        sm_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        group_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        // failure: {
        //     allowNull: true,
        //     type: DataTypes.BOOLEAN
        // },
        // failure_time: {
        //     allowNull: true,
        //     type: DataTypes.STRING
        // },
        rfid_cart: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        machine_type_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        machine_group_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        groups: Sequelize.VIRTUAL,
    }, {
        timestamps: false
    }, {
        tableName: 'machines'
    });
    machines.prototype.fields = [
        'machine_id',
        'machine_label',
        'machine_model',
        'machine_totalworkinghours',
        'machine_startworkdate',
        'machine_workingevt',
        'machine_manufaclifetime',
        'machine_productivity',
        'machine_totalstitchcount',
        'line_id',
        'machine_totaluptime',
        'machine_totaldowntime',
        'sm_id',
        'failure',
        'group_id',
        'failure_time',
        'rfid_cart',
        'active',
        'machine_type_id',
        'machine_group_id'
    ];
    machines.prototype.fieldsSearchMetas = [
        'machine_label',
        'machine_model',
        'machine_startworkdate'
    ];
    const status_machines = require('./status_machines');
    const lines = require('./lines');
    const machine_types = require('./machine_types');
    const machine_groups = require('./machine_groups');

    machines.prototype.modelIncludes = {
        'status_machines': {
            model: status_machines
        },
        'lines': {
            model: lines
        },
        'machine_types': {
            model: machine_types
        },
        'machine_groups': {
            model: machine_groups
        },
    };
    machines.associate = function (models) {
        machines.belongsTo(models.status_machines, {
            foreignKey: 'sm_id'
        });
        machines.belongsTo(models.lines, {
            foreignKey: 'line_id'
        });
        machines.belongsTo(models.machine_types, {
            foreignKey: 'machine_type_id'
        });
        machines.belongsTo(models.machine_groups, {
            foreignKey: 'machine_group_id'
        });
    };
    return machines;
};
