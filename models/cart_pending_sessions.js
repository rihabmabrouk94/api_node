'use strict';
module.exports = (sequelize, DataTypes) => {
    const cart_pending_sessions = sequelize.define('cart_pending_sessions', {
        cart_pending_session_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cart_pendingoperation_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        session_id: {
            allowNull: false,

            type: DataTypes.INTEGER
        },
        status: {
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
            type: DataTypes.INTEGER
        },
        quantity: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        created_at: {
            allowNull: true,
            type: DataTypes.STRING
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.STRING
        },
        break_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        time_break_blue: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        starttime: {
            allowNull: true,
            type: DataTypes.STRING
        },
        endtime: {
            allowNull: true,
            type: DataTypes.STRING
        },
        system_quantity: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        work_quality: {
            allowNull: true,
            type: DataTypes.STRING
        },
        started_at: {
            allowNull: true,
            type: DataTypes.DATE
        },
        start_time: {
            allowNull: true,
            type: DataTypes.DATE
        },
        end_time: {
            allowNull: true,
            type: DataTypes.DATE
        },
        reparation: {
            allowNull: true,
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        in_progress: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        }
    }, {
        timestamps: false
    }, {
        tableName: 'cart_pending_sessions'
    });

    cart_pending_sessions.prototype.fields = [
        'cart_pending_session_id',
        'cart_pendingoperation_id',
        'session_id',
        'status',
        'stitch_count',
        'thread_cuts',
        'time',
        'quantity',
        'created_at',
        'updated_at',
        'break_id',
        'time_break_blue',
        'active',
        'work_quality',
        'system_quantity',
        'started_at',
        'start_time',
        'end_time',
        'in_progress'
    ];

    cart_pending_sessions.prototype.fieldsSearchMetas = [
        'status',
        'stitch_count',
        'thread_cuts',
        'time',
        'quantity',
        'updated_at',
        'time_break_blue',
        'work_quality',
        'system_quantity',
        'started_at',
        'start_time',
        'end_time',
        'in_progress'
    ];

    const usersessions = require('./usersessions');
    const breaks = require('./breaks');
    const cart_pending_operations = require('./cart_pending_operations');

    cart_pending_sessions.prototype.modelIncludes = {
        'usersessions': {
            model: usersessions
        },
        'breaks': {
            model: breaks
        },
        'cart_pending_operations' : {
            model : cart_pending_operations
        }
    }

    cart_pending_sessions.associate = function (models) {
        cart_pending_sessions.belongsTo(models.usersessions, {
            foreignKey: 'session_id'
        });

        cart_pending_sessions.belongsTo(models.breaks, {
            foreignKey: 'break_id'
        });

        cart_pending_sessions.belongsTo(models.cart_pending_operations, {
            foreignKey: 'cart_pendingoperation_id'
        });
    };
    return cart_pending_sessions;
};
