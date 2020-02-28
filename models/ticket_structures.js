'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const ticket_structures = sequelize.define('ticket_structures', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        subject: {
            allowNull: true,
            type: DataTypes.STRING
        },
        line_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        department_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        operation_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        current_status_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        created_at: {
            allowNull: true,
            type: DataTypes.DATE
        },
        created_by: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        owner_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        observation_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        bundle_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        box_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        order_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        source: {
            allowNull: true,
            type: DataTypes.STRING
        },
        image_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        id_priority: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        ticket_feeds: Sequelize.VIRTUAL

    }, {
        timestamps: false
    }, {
        tableName: 'ticket_structures'
    });
    ticket_structures.prototype.fields = [
        'id',
        'subject',
        'line_id',
        'department_id',
        'operation_id',
        'operation_label',
        'operation_description',
        'current_status_id',
        'created_at',
        'created_by',
        'owner_id',
        'observation_id',
        'source',
        'image_id',
        'id_priority',
        'active'
    ];
    ticket_structures.prototype.fieldsSearchMetas = [
        'subject',
        'operation_label',
        'operation_description',
        'current_status_id',
        'created_at',
        'created_by',
        'owner_id',
        'source',
        'image_id',
          'id_priority'];
    const lines = require('./lines');
    const jobs = require('./jobs');
    const operation_templates = require('./operation_templates');
    const observations = require('./observations');
    const status_tickets = require('./status_tickets');
    const users = require('./users');
    const bundles = require('./bundles');
    const orders = require('./orders');
    const boxes = require('./boxes');
    const efiles = require('./efiles');
    const priorities = require('./priorities');

    ticket_structures.prototype.modelIncludes = {
        'lines': {
            model: lines
        },
        'jobs': {
            model: jobs
        },
        'operation_templates': {
            model: operation_templates
        },
        'observations': {
            model: observations
        },
        'status_tickets': {
            model: status_tickets
        },
        'createdBy': {
            model: users
        },
        'owner': {
            model: users
        },
        'bundles': {
            model: bundles
        },
        'orders': {
            model: orders
        },
        'boxes': {
            model: boxes
        },
        'efiles': {
            model: efiles
        },
        'priorities': {
            model: priorities
        }
    };
    ticket_structures.associate = function (models) {
        ticket_structures.belongsTo(models.lines, {
            foreignKey: 'line_id'
        });
        ticket_structures.belongsTo(models.jobs, {
            foreignKey: 'department_id'
        });
        ticket_structures.belongsTo(models.operation_templates, {
            foreignKey: 'operation_id'
        });
        ticket_structures.belongsTo(models.observations, {
            foreignKey: 'observation_id'
        });
        ticket_structures.belongsTo(models.status_tickets, {
            foreignKey: 'current_status_id'
        });
        ticket_structures.belongsTo(models.users, {
            foreignKey: 'created_by'
        });
        ticket_structures.belongsTo(models.users, {
            foreignKey: 'owner_id'
        });
        ticket_structures.belongsTo(models.bundles, {
            foreignKey: 'bundle_id'
        });
        ticket_structures.belongsTo(models.orders, {
            foreignKey: 'order_id'
        });
        ticket_structures.belongsTo(models.boxes, {
            foreignKey: 'box_id'
        });
        ticket_structures.belongsTo(models.efiles, {
            foreignKey: 'image_id'
        });
        ticket_structures.belongsTo(models.priorities, {
            foreignKey: 'id_priority'
        });
    };
    return ticket_structures;
};
