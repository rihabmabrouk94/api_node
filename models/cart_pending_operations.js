'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const cart_pending_operations = sequelize.define('cart_pending_operations', {
        cart_pending_operation_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operation_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        bundle_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        finished: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        stitch_count: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        thread_cuts: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        time: {
            allowNull: true,
            type: DataTypes.STRING
        },
        quantity: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        datestart: {
            allowNull: true,
            type: DataTypes.DATE
        },
        machine_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        datereadbundle: {
            allowNull: true,
            type: DataTypes.STRING
        },
        dateend: {
            allowNull: true,
            type: DataTypes.DATE
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        cps: Sequelize.VIRTUAL,
        operators: Sequelize.VIRTUAL,
        reparation: {
            allowNull: true,
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        in_progress: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'N'
        }
    }, {
        timestamps: false
    }, {
        tableName: 'cart_pending_operations'
    });

    cart_pending_operations.prototype.fields = [
        'cart_pending_operation_id',
        'bundle_id',
        'finished',
        'stitch_count',
        'thread_cuts',
        'time',
        'quantity',
        'datestart',
        'machine_id',
        'datereadbundle',
        'active',
        'operation_id',
        'dateend',
        'reparation',
        'in_progress'
    ];

    cart_pending_operations.prototype.fieldsSearchMetas = [
        'finished',
        'stitch_count',
        'thread_cuts',
        'time',
        'quantity',
        'datestart',
        'datereadbundle',
        'dateend',
        'reparation',
        'in_progress'
    ];

    const operations = require('./operations');
    const bundles = require('./bundles');
    const machines = require('./machines');

    cart_pending_operations.prototype.modelIncludes = {
        'operations': {
            model: operations
        },
        'bundles': {
            model: bundles
        },
        'machines': {
            model: machines
        }
    }


    cart_pending_operations.associate = function (models) {

        cart_pending_operations.belongsTo(models.operations, {
            foreignKey: 'operation_id'
        });

        cart_pending_operations.belongsTo(models.machines, {
            foreignKey: 'machine_id'
        });

        cart_pending_operations.belongsTo(models.bundles, {
            foreignKey: 'bundle_id'
        });
    };
    return cart_pending_operations;
};
