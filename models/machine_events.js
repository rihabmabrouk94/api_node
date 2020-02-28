'use strict';
module.exports = (sequelize, DataTypes) => {
    const machine_events = sequelize.define('machine_events', {
            machine_evt_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                unique: true
            },
            date_time_event_start: {
                allowNull: true,
                type: DataTypes.DATE
            },
            event_type: {
                allowNull: true,
                type: DataTypes.STRING
            },
            event_id: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            cause: {
                allowNull: true,
                type: DataTypes.STRING
            },
            description: {
                allowNull: true,
                type: DataTypes.STRING
            },
            machine_id: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            date_time_event_end: {
                allowNull: true,
                type: DataTypes.DATE
            },
            machine_event_type_id: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            event_quantity: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            saved_at: {
                allowNull: true,
                type: DataTypes.STRING
            },
            active: {
                allowNull: true,
                type: DataTypes.STRING,
                defaultValue: 'Y'
            },
            down_time: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            total_time: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            stitch_count: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            back_stitch: {
                allowNull: true,
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false
        },
        {
            tableName: 'machine_events'
        }
    );

    const events = require('./events');
    const machines = require('./machines');
    const machine_event_types = require('./machine_event_types')
    machine_events.prototype.modelIncludes = {
        'events': {
            model: events
        },
        'machines': {
            model: machines
        },
        'machine_event_types': {
            model: machine_event_types
        }

    };
    machine_events.prototype.fields = [
        'machine_evt_id',
        'date_time_event_start',
        'event_type',
        'event_id',
        'cause',
        'description',
        'machine_id',
        'date_time_event_end'
    ];
    machine_events.prototype.fieldsSearchMetas = [
        'date_time_event_start',
        'event_type',
        'event_id',
        'cause',
        'description',
        'machine_id',
        'date_time_event_end'
    ];

    machine_events.associate = function (models) {
        machine_events.belongsTo(models.machines, {
            foreignKey: 'machine_id'
        });

        machine_events.belongsTo(models.events, {
            foreignKey: 'event_id'
        });

        machine_events.belongsTo(models.machine_event_types, {
            foreignKey: 'machine_event_type_id'
        });

    };
    return machine_events;
};

