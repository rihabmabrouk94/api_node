'use strict';
module.exports = (sequelize, DataTypes) => {
  const skill_operations = sequelize.define('skill_operations', {
    skill_operation_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    skill_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_template_id:{
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active:{
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
  }, {
    timestamps: false
  }, {
    tableName: 'skill_operations'
  });
  skill_operations.prototype.fields = [
    'skill_operation_id',
    'skill_id',
    'operation_template_id',
    'active'
  ];
  skill_operations.associate = function(models) {
    skill_operations.belongsTo(models.skills, {
      foreignKey: 'skill_id'
    });
    skill_operations.belongsTo(models.operation_templates, {
      foreignKey: 'operation_template_id'
    });

    // associations can be defined here
  };
  return skill_operations;
};
