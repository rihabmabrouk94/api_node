'use strict';
module.exports = (sequelize, DataTypes) => {
  const operation_templates = sequelize.define('operation_templates', {
    operation_template_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    accMinPrice: {
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
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    with_subsequence : {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  }, {
    tableName: 'operation_templates'
  });
  operation_templates.prototype.fields = [
    'operation_template_id',
    'accMinPrice',
    'time',
    'description',
    'op_code',
    'label',
    'machine_type_id',
    'active',
      'with_subsequence'
  ];
  operation_templates.prototype.fieldsSearchMetas = [
    'accMinPrice',
    'time',
    'description',
    'op_code',
    'label',
    'machine_type_id'

  ];
  const machine_types = require('./machine_types');
  operation_templates.prototype.modelIncludes = {
    'machine_types': {
      model: machine_types
    }
  };
  operation_templates.associate = function(models) {
    operation_templates.belongsTo(models.machine_types, {
      foreignKey: 'machine_type_id'
    });
  };
  return operation_templates;
};
