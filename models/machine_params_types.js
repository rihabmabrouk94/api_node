'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine_params_types = sequelize.define('machine_params_types', {
    machine_params_type_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    label: {
      allowNull: true,
      type: DataTypes.STRING
    },
    machine_type_id: {
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
    tableName: 'machine_params_types'
  });
  machine_params_types.prototype.fields = [
    'machine_params_type_id',
    'quantity',
    'code',
    'label',
    'active',
    'machine_type_id'
  ];
  machine_params_types.prototype.fieldsSearchMetas = [
    'quantity',
    'code',
    'label',
    'active',
    'machine_type_id'
  ];

  const machine_types = require('./machine_types');

  machine_params_types.prototype.modelIncludes = {
    'machine_types': {
      model: machine_types
    }
  };
  machine_params_types.associate = function(models) {
    machine_params_types.belongsTo(models.machine_types, {
      foreignKey: 'machine_type_id'
    });
  }

  return machine_params_types;
};
