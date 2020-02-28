'use strict';
module.exports = (sequelize, DataTypes) => {
  const token_api_listeners = sequelize.define('token_api_listeners', {
    token_api_listener_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    response: {
      allowNull: true,
      type: DataTypes.STRING
    },
    token: {
      allowNull: true,
      type: DataTypes.STRING
    },
    requestdata: {
      allowNull: true,
      type: DataTypes.STRING
    },
    date_created: {
      allowNull: true,
      type: DataTypes.STRING
    },
    retries: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'token_api_listeners'
  });
  token_api_listeners.prototype.fields = [
    'token_api_listener_id',
    'token',
    'response',
    'requestdata',
    'date_created',
    'retries',
    'active'
  ];
  token_api_listeners.prototype.fieldsSearchMetas = [
    'token',
    'response',
    'requestdata',
    'date_created',
    'retries',
  ];
  token_api_listeners.associate = function(models) {
    // associations can be defined here
  };
  return token_api_listeners;
};
