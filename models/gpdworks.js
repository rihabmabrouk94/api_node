'use strict';
module.exports = (sequelize, DataTypes) => {
  const gpdworks = sequelize.define('gpdworks', {
    gpdwork_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orderid: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    ordercode: {
      allowNull: true,
      type: DataTypes.STRING
    },
    ordernr: {
      allowNull: true,
      type: DataTypes.STRING
    },
    modelid: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    modelcode: {
      allowNull: true,
      type: DataTypes.STRING
    },
    opid: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    opcode: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lopname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    machtypeid: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    machtypecode: {
      allowNull: true,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: true,
      type: DataTypes.STRING
    },
    sam: {
      allowNull: true,
      type: DataTypes.STRING
    },
    opgroup: {
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
    tableName: 'gpdworks'
  });
  gpdworks.prototype.fields = [
    'gpdwork_id',
    'orderid',
    'ordercode',
    'ordernr',
    'modelid',
    'modelcode',
    'opid',
    'opcode',
    'lopname',
    'machtypeid',
    'machtypecode',
    'quantity',
    'sam',
    'opgroup',
    'active'
  ];
  gpdworks.prototype.fieldsSearchMetas = [
    'orderid',
    'ordercode',
    'ordernr',
    'modelid',
    'modelcode',
    'opid',
    'opcode',
    'lopname',
    'machtypeid',
    'machtypecode',
    'quantity',
    'sam',
    'opgroup',
    'active'
  ];
  const orders = require('./orders');
  const operations = require('./operations');
  gpdworks.prototype.modelIncludes = {
    'orders': {
      model: orders
    },
    'operations': {
      model: operations
    }
  };
  gpdworks.associate = function(models) {
    gpdworks.belongsTo(models.orders, {
      foreignKey: 'orderid'
    });
    gpdworks.belongsTo(models.operations, {
      foreignKey: 'opid'
    });  };
  return gpdworks;
};
