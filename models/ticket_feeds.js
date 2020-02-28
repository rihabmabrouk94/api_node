'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ticket_feeds = sequelize.define('ticket_feeds', {
    ticket_feed_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: {
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
    status_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    department_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
      owner_id: {
          allowNull: true,
          type: DataTypes.INTEGER
      },
    ticket_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    image_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    efiles: Sequelize.VIRTUAL,
    ticket_feed_attachments: Sequelize.VIRTUAL
  }, {
    timestamps: false
  }, {
    tableName: 'ticket_feeds'
  });
  ticket_feeds.prototype.fields = [
    'ticket_feed_id',
    'comment',
    'created_at',
    'created_by',
    'status_id',
    'department_id',
      'owner_id',
    'ticket_id',
      'image_id',
    'active'
  ];
  ticket_feeds.prototype.fieldsSearchMetas = [
    'comment',
    'created_at',
    'created_by',
      'owner_id',
      'department_id',
    'ticket_id',
      'image_id'
  ];
  const status_tickets = require('./status_tickets');
  const jobs = require('./jobs');
  const users = require('./users');
  const ticket_structures = require('./ticket_structures');
  const efiles = require('./efiles');

  ticket_feeds.prototype.modelIncludes = {
    'status_tickets': {
      model: status_tickets
    },
    'jobs': {
      model: jobs
    },
      'owner': {
          model: users
      },
    'ticket_structures': {
      model: ticket_structures
    },
    'efiles': {
      model: efiles
    },
    'createdBy': {
      model: users
    },
  };
  ticket_feeds.associate = function(models) {
    ticket_feeds.belongsTo(models.status_tickets, {
      foreignKey: 'status_id'
    });
    ticket_feeds.belongsTo(models.jobs, {
      foreignKey: 'department_id'
    });
      ticket_feeds.belongsTo(models.users, {
          foreignKey: 'owner_id',
            as : 'owner'
      });
    ticket_feeds.belongsTo(models.ticket_structures, {
      foreignKey: 'ticket_id'
    });
    ticket_feeds.belongsTo(models.efiles, {
      foreignKey: 'image_id'
    });
    ticket_feeds.belongsTo(models.users, {
      foreignKey: 'created_by',
      as : 'createdBy'
    });
  };
  return ticket_feeds;
};
