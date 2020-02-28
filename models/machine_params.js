'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine_params = sequelize.define('machine_params', {
    machine_params_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity_limit: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    quantity_done: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    machine_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    machine_params_type_id:{
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
    tableName: 'machine_params'
  });
  machine_params.prototype.fields = [
    'machine_params_id',
    'quantity_limit',
    'quantity_done',
    'machine_id',
    'machine_params_type_id',
    'active'
  ];
  machine_params.prototype.fieldsSearchMetas = [
    'quantity_limit',
    'quantity_done',
  ];
  const machines = require('./machines');
  const machine_params_types = require('./machine_params_types');

  machine_params.prototype.modelIncludes = {
    'machines': {
      model: machines
    },
    'machine_params_types': {
      model: machine_params_types
    }
  }
  machine_params.associate = function(models) {
    machine_params.belongsTo(models.machines, {
      foreignKey: 'machine_id'
    });
    machine_params.belongsTo(models.machine_params_types, {
      foreignKey: 'machine_params_type_id'
    });
  };
  return machine_params;
};
