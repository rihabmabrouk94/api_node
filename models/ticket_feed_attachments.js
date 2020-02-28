'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket_feed_attachments = sequelize.define('ticket_feed_attachments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    file_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    ticket_feed_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'ticket_feed_attachments'
  });
  ticket_feed_attachments.prototype.fields = [
    'id',
    'file_id',
    'created_at',
    'ticket_feed_id',
    'active'
  ];
  ticket_feed_attachments.prototype.fieldsSearchMetas = [
    'file_id',
    'created_at'
  ];
  const ticket_feeds = require('./ticket_feeds');
  const efiles = require('./efiles');

  ticket_feed_attachments.prototype.modelIncludes = {
    'ticket_feeds': {
      model: ticket_feeds
    },
    'efiles': {
      model: efiles
    }
  };
  ticket_feed_attachments.associate = function(models) {
    ticket_feed_attachments.belongsTo(models.ticket_feeds, {
      foreignKey: 'ticket_feed_id'
    });
    ticket_feed_attachments.belongsTo(models.efiles, {
      foreignKey: 'file_id'
    });
  };
  return ticket_feed_attachments;
};
