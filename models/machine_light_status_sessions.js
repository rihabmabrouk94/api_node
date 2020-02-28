'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine_light_status_sessions = sequelize.define('machine_light_status_sessions', {
    machine_light_status_session_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    light_status_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    start: {
      allowNull: true,
      type: DataTypes.STRING
    },
    end: {
      allowNull: false,
      type: DataTypes.STRING
    },
    metas: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  }, {
    tableName: 'machine_light_status_sessions'
  });

  machine_light_status_sessions.prototype.fields = [
    'machine_light_status_session_id',
    'light_status_id',
    'start',
    'metas',
    'end',
    'metas',
    'active'
  ];

  machine_light_status_sessions.prototype.fieldsSearchMetas = [
    'machine_light_status_id',
    'light_status_id',
    'start',
    'metas',
    'end',
    'metas'
  ];

  machine_light_status_sessions.prototype.modelIncludes = {

  }
  machine_light_status_sessions.associate = function(models) {
    // associations can be defined here
  };
  return machine_light_status_sessions;
};
