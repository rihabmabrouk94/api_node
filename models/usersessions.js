'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersessions = sequelize.define('usersessions', {
    usersession_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    box_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    last_tag: {
      allowNull: true,
      type: DataTypes.STRING
    },
    time_in: {
      allowNull: true,
      type: DataTypes.DATE
    },
    time_out: {
      allowNull: true,
      type: DataTypes.DATE
    },
    cart_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    logout_tag: {
      allowNull: true,
      type: DataTypes.STRING
    },
    op_offset: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    usersession_export: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    employee_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  }, {
    tableName: 'usersessions'
  });
  usersessions.prototype.fields = [
    'usersession_id',
    'box_id',
    'last_tag',
    'time_in',
    'time_out',
    'cart_id',
    'logout_tag',
    'op_offset',
    'usersession_export',
    'active',
    'employee_id'
  ];
  usersessions.prototype.fieldsSearchMetas = [
    'box_id',
    'last_tag',
    'time_in',
    'time_out',
    'cart_id',
    'logout_tag',
    'op_offset',
    'usersession_export',
    'active'
  ];
  const employees = require('./employees');
  const boxes = require('./boxes');
  const carts = require('./carts');
  usersessions.prototype.modelIncludes = {
    'employees': {
      model: employees
    },
    'boxes': {
      model: boxes
    },
    'carts': {
      model: carts
    }
  };


  usersessions.associate = function(models) {
    usersessions.belongsTo(models.employees, {
      foreignKey: 'employee_id'
    });
    usersessions.belongsTo(models.boxes, {
      foreignKey: 'box_id'
    });
    usersessions.belongsTo(models.carts, {
      foreignKey: 'cart_id'
    });
  };
  return usersessions;
};
