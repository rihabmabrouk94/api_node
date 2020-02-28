'use strict';
module.exports = (sequelize, DataTypes) => {
  const skill_employees = sequelize.define('skill_employees', {
    skill_employee_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    skill_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    emp_id: {
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
    tableName: 'skill_employees'
  });
  skill_employees.prototype.fields = [
    'skill_employee_id',
    'skill_id',
    'emp_id',
    'active'
  ];
  skill_employees.associate = function(models) {
    skill_employees.belongsTo(models.skills, {
      foreignKey: 'skill_id'
    });

    skill_employees.belongsTo(models.employees, {
      foreignKey: 'emp_id'
    });
  };
  return skill_employees;
};
