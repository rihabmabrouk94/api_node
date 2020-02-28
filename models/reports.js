'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    report_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    box_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    bundle_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    cart_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    status: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    finished: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    stitch_count: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    thread_cuts: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    time: {
      allowNull: true,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    datestart: {
      allowNull: true,
      type: DataTypes.STRING
    },
    dateend: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'reports'
  });
  reports.prototype.fields = [
    'report_id',
    'user_id',
    'operation_id',
    'box_id',
    'bundle_id',
    'cart_id',
    'status',
    'finished',
    'stitch_count',
    'thread_cuts',
    'time',
    'quantity',
    'datestart',
    'dateend',
    'active'
  ];
  reports.prototype.fieldsSearchMetas = [
    'status',
    'finished',
    'stitch_count',
    'thread_cuts',
    'time',
    'quantity',
    'datestart',
    'dateend',
  ];
  const users = require('./users');
  const operations = require('./operations');
  const boxes = require('./boxes');
  const bundles = require('./bundles');
  const carts = require('./carts');
  reports.prototype.modelIncludes = {
    'users': {
      model: users
    },
    'operations': {
      model: operations
    },
    'boxes': {
      model: boxes
    },
    'bundles': {
      model: bundles
    },
    'carts': {
      model: carts
    }
  };
  reports.associate = function(models) {
    reports.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
    reports.belongsTo(models.operations, {
      foreignKey: 'operation_id'
    });
    reports.belongsTo(models.boxes, {
      foreignKey: 'box_id'
    });
    reports.belongsTo(models.bundles, {
      foreignKey: 'bundle_id'
    });
    reports.belongsTo(models.carts, {
      foreignKey: 'cart_id'
    });
  };
  return reports;
};
