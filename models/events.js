'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    event_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    event_label: {
      allowNull: false,
      type: DataTypes.STRING
    },
    active : {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  }, {
    tableName: 'events'
  });

  events.prototype.fields = [
    'event_id',
    'event_label'
  ];
  events.associate = function(models) {
    // associations can be defined here
  };
  return events;
};
