'use strict';
module.exports = (sequelize, DataTypes) => {
  const taking = sequelize.define('takings', {
    taking_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    note: {
      allowNull: true,
      type: DataTypes.STRING
    },
    date: {
      allowNull: true,
      type: DataTypes.STRING
    },
    order_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    stock_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    bundle_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    total_quantity: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  },  {
    timestamps: false
  }, {
    tableName: 'takings'
  });

  taking.prototype.fields = [
    'taking_id',
    'note',
    'date',
    'order_id',
    'operation_id',
    'bundle_id',
    'stock_id',
    'active'
  ];

  taking.prototype.fieldsSearchMetas = [
    'taking_id',
    'note',
    'date',
    'order_id',
    'operation_id',
    'bundle_id',
    'stock_id',
    'active'
  ];

  const bundles = require('./bundles');
  const orders = require('./orders');
  const operations = require('./operations');
  const stock_production_products = require('./stock_production_products');

  taking.prototype.modelIncludes = {
    'bundles': {
      model: bundles
    },
    'orders': {
      model: orders
    },
    'operations': {
      model: operations
    },
    'stock_production_products': {
      model: stock_production_products
    }
  };

  taking.prototype.getModelIncludes = function() {
    return ['bundles', 'orders', 'operations', 'stock_production_products'];
  };

  taking.associate = function(models) {
    taking.belongsTo(models.bundles, {
      foreignKey: 'bundle_id'
    });
    taking.belongsTo(models.orders, {
      foreignKey: 'order_id'
    });

    taking.belongsTo(models.operations, {
      foreignKey: 'operation_id'
    });
    taking.belongsTo(models.stock_production_products, {
      foreignKey: 'stock_id'
    });
  };
  return taking;
};
