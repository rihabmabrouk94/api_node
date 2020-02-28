'use strict';
module.exports = (sequelize, DataTypes) => {
    const cart_reopened_operations = sequelize.define('cart_reopened_operations', {
        cart_reopened_operation_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        bundle_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        cart_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        operation_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        box_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        status: {
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
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        datestart: {
            allowNull: true,
            type: DataTypes.STRING
        },
        quantity: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        time: {
            allowNull: true,
            type: DataTypes.STRING
        },
        dateend: {
            allowNull: true,
            type: DataTypes.STRING
        }

    }, {
        timestamps: false
    }, {
        tableName: 'cart_reopened_operations'
    });

    cart_reopened_operations.prototype.fields = [
        'cart_reopened_operation_id',
        'bundle_id',
        'user_id',
        'cart_id',
        'operation_id',
        'box_id',
        'status',
        'finished',
        'stitch_count',
        'thread_cuts',
        'active',
        'datestart',
        'quantity',
        'time',
        'dateend'
    ];

    cart_reopened_operations.prototype.fieldsSearchMetas = [
        'status',
        'finished',
        'stitch_count',
        'thread_cuts',
        'active',
        'datestart',
        'quantity',
        'time',
        'dateend'
    ];

    const bundles = require('./bundles');
    const carts = require('./carts');
    const operations = require('./operations');
    const boxes = require('./boxes');
    const users = require('./users');

    cart_reopened_operations.prototype.modelIncludes = {
        'bundles': {
            model: bundles
        },
        'carts': {
            model: carts
        },
        'operations' : {
            model : operations
        },
        'users' : {
            model : users
        },
        'boxes' : {
            model : boxes
        }
    }

    cart_reopened_operations.associate = function (models) {

        cart_reopened_operations.belongsTo(models.bundles, {
            foreignKey: 'bundle_id'
        });

        cart_reopened_operations.belongsTo(models.carts, {
            foreignKey: 'cart_id'
        });

        cart_reopened_operations.belongsTo(models.operations, {
            foreignKey: 'operation_id'
        });

        cart_reopened_operations.belongsTo(models.boxes, {
            foreignKey: 'box_id'
        });

        cart_reopened_operations.belongsTo(models.users, {
            foreignKey: 'user_id'
        });
    };
    return cart_reopened_operations;
};
