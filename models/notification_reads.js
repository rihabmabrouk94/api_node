'use strict';
module.exports = (sequelize, DataTypes) => {
  const notification_reads = sequelize.define('notification_reads', {
    notification_read_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    notification_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    employee_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    read: {
      allowNull: true,
      type: DataTypes.STRING
    },
    date_read: {
      allowNull: true,
      type: DataTypes.DATE
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'notification_reads'
  });
  notification_reads.prototype.fields = [
    'notification_read_id',
    'notification_id',
    'employee_id',
    'read',
    'date_read',
    'active'
  ];
  notification_reads.prototype.fieldsSearchMetas = [
    'notification_id',
    'employee_id',
    'read',
    'date_read'
  ];
  const employees = require('./employees');
  const notifications = require('./notifications');
  notification_reads.prototype.modelIncludes = {
    'employees': {
      model: employees
    },
    'notifications': {
      model: notifications
    },
  }
  notification_reads.associate = function(models) {
    notification_reads.belongsTo(models.employees, {
      foreignKey: 'employee_id'
    });
    notification_reads.belongsTo(models.notifications, {
      foreignKey: 'notification_id'
    });
  };
  return notification_reads;
};
