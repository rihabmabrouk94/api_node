'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine_operation_templates = sequelize.define('machine_operation_templates', {
    machine_operation_template_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    machine_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_template_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },

  }, {
    timestamps: false
  }, {
    tableName: 'machine_operation_templates'
  });
  machine_operation_templates.prototype.fields = [
    'machine_operation_template_id',
    'machine_id',
    'operation_template_id',
    'active'
  ];
  machine_operation_templates.associate = function(models) {
    machine_operation_templates.belongsTo(models.machines, {
      foreignKey: 'machine_id'
    });
    machine_operation_templates.belongsTo(models.operation_templates, {
      foreignKey: 'operation_template_id'
    });
  };
  return machine_operation_templates;
};