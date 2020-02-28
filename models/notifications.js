'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    notification_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    message: {
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
    employee_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    box_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    machine_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    bundle_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    line_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    notification_reads: Sequelize.VIRTUAL
  }, {
    timestamps: false
  }, {
    tableName: 'notifications'
  });
  notifications.prototype.fields = [
    'notification_id',
    'message',
    'created_at',
    'created_by',
    'employee_id',
    'box_id',
    'operation_id',
    'machine_id',
    'bundle_id',
    'line_id',
    'active'
  ];
  notifications.prototype.fieldsSearchMetas = [
    'message',
    'created_at'
  ];
  const lines = require('./lines');
  const operations = require('./operations');
  const users = require('./users');
  const bundles = require('./bundles');
  const boxes = require('./boxes');
  const machines = require('./machines');
  const employees = require('./employees');
  notifications.prototype.modelIncludes = {
    'lines': {
      model: lines
    },
    'operations': {
      model: operations
    },
    'machines': {
      model: machines
    },
    'employees': {
      model: employees
    },
    'createdBy': {
      model: users
    },
    'bundles': {
      model: bundles
    },
    'boxes': {
      model: boxes
    }
  };
  notifications.associate = function(models) {
    notifications.belongsTo(models.lines, {
      foreignKey: 'line_id'
    });
    notifications.belongsTo(models.operations, {
      foreignKey: 'operation_id'
    });
    notifications.belongsTo(models.machines, {
      foreignKey: 'machine_id'
    });
    notifications.belongsTo(models.employees, {
      foreignKey: 'employee_id'
    });
    notifications.belongsTo(models.users, {
      foreignKey: 'created_by'
    });
    notifications.belongsTo(models.bundles, {
      foreignKey: 'bundle_id'
    });
    notifications.belongsTo(models.boxes, {
      foreignKey: 'box_id'
    });
  };
  return notifications;
};
