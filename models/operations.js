'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const operations = sequelize.define('operations', {
    operation_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    accminprice: {
      allowNull: true,
      type: DataTypes.STRING
    },
    time: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    op_code: {
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
    machine_groupe_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },

    bundle_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    line_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    sequences: Sequelize.VIRTUAL
  }, {
    timestamps: false
  }, {
    tableName: 'operations'
  });
  operations.prototype.fields = [
    'operation_id',
    'accminprice',
    'time',
    'description',
    'op_code',
    'label',
    'machine_type_id',
    'machine_groupe_id',
    'bundle_id',
    'active',
    'line_id',
      'quantity'
  ];
  operations.prototype.fieldsSearchMetas = [
    'accminprice',
    'time',
    'description',
    'op_code',
    'label',
    'machine_type_id',
    'machine_groupe_id',
    'bundle_id',
    'active',
    'line_id',
      'quantity'
  ];
  const bundles = require('./bundles');
  const machine_types = require('./machine_types');
  const machine_groups = require('./machine_groups');
  const lines = require('./lines')

  operations.prototype.modelIncludes = {
    'bundles': {
      model: bundles
    },
    'machine_types': {
      model: machine_types
    },
    'machine_groups': {
      model: machine_groups
    },
    'lines': {
      model: lines
    }
  };
  operations.associate = function(models) {
    operations.belongsTo(models.bundles, {
      foreignKey: 'bundle_id'
    });

    operations.belongsTo(models.machine_types, {
      foreignKey: 'machine_type_id'
    });

    operations.belongsTo(models.machine_groups, {
      foreignKey: 'machine_groupe_id'
    });

    operations.belongsTo(models.lines, {
      foreignKey: 'line_id'
    });
  };
  return operations;
};
