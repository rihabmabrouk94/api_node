'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const operation_direct_production_modes = sequelize.define('operation_direct_production_modes', {
    operation_direct_production_mode_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    direct_production_mode_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_template_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    order: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    modelIncludes:  Sequelize.VIRTUAL
  }, {
    timestamps: false
  }, {
    tableName: 'operation_direct_production_modes'
  });
  operation_direct_production_modes.prototype.getModelIncludes = function() {
    return ['operation_templates', 'direct_production_modes'];
  };
  operation_direct_production_modes.prototype.fields = [
    'operation_direct_production_mode_id',
    'direct_production_mode_id',
    'operation_template_id',
    'active',
      'order'
  ];
  operation_direct_production_modes.prototype.fieldsSearchMetas = [
    'operation_direct_production_mode_id',
    'direct_production_mode_id',
    'operation_template_id',
    'active',
      'order'
  ];

  operation_direct_production_modes.associate = function(models) {
    operation_direct_production_modes.belongsTo(models.operation_templates, {
      foreignKey: 'operation_template_id'
    });
    operation_direct_production_modes.belongsTo(models.direct_production_modes, {
      foreignKey: 'direct_production_mode_id'
    });
  };
  return operation_direct_production_modes;
};
