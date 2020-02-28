'use strict';
module.exports = (sequelize, DataTypes) => {
  const observations = sequelize.define('observations', {
    observation_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: {
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
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    finished: {
      allowNull: true,
      type: DataTypes.STRING
    },
    line_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: false
  }, {
    tableName: 'observations'
  });
  observations.prototype.fields = [
    'observation_id',
    'label',
    'created_at',
    'created_by',
    'active',
    'finished',
      'line_id'
  ];
  observations.prototype.fieldsSearchMetas = [
    'observation_id',
    'label',
    'created_at',
    'created_by',
    'active',
    'finished',
    'line_id'

  ];
  const lines = require('./lines');
  const users = require('./users');

  observations.prototype.modelIncludes = {
    'lines': {
      model: lines
    },
    'users': {
      model: users
    }
  };
  observations.associate = function(models) {
    observations.belongsTo(models.lines, {
      foreignKey: 'line_id'
    });
    observations.belongsTo(models.users, {
      foreignKey: 'created_by'
    });
  };
  return observations;
};
