'use strict';
module.exports = (sequelize, DataTypes) => {
  const stock_production_products = sequelize.define('stock_production_products', {
    stock_production_product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    production_product_provider_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    production_product_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    receipt_note: {
      allowNull: true,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    quantity_used: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    quantity_available: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    date_receipt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    unit_price:{
      allowNull: true,
      type: DataTypes.INTEGER
    },
    total_price:{
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'stock_production_products'
  });
  stock_production_products.prototype.fields = [
    'stock_production_product_id',
    'production_product_provider_id',
    'production_product_id',
    'receipt_note',
    'quantity',
    'quantity_used',
    'quantity_available',
    'date_receipt',
    'unit_price',
    'total_price',
    'active'
  ];
  stock_production_products.prototype.fieldsSearchMetas = [
    'production_product_provider_id',
    'production_product_id',
    'receipt_note',
    'quantity',
    'quantity_used',
    'quantity_available',
    'date_receipt',
    'unit_price',
    'total_price'
  ];

  const production_product_providers = require('./production_product_providers');
  const production_products = require('./production_products');

  stock_production_products.prototype.modelIncludes = {
    'production_product_providers': {
      model: production_product_providers
    },
    'production_products': {
      model: production_products
    }
  };
  stock_production_products.associate = function(models) {
    stock_production_products.belongsTo(models.production_product_providers, {
      foreignKey: 'production_product_provider_id'
    });
    stock_production_products.belongsTo(models.production_products, {
      foreignKey: 'production_product_id'
    });
  };
  return stock_production_products;
};
