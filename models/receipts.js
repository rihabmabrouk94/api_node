'use strict';
module.exports = (sequelize, DataTypes) => {
  const receipts = sequelize.define('receipts', {
    receipt_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ref: {
      allowNull: true,
      type: DataTypes.STRING
    },
    production_product_provider_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    date: {
      allowNull: true,
      type: DataTypes.DATE
    },
    note: {
      allowNull: true,
      type: DataTypes.STRING
    },
    devise_id:{
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
    tableName: 'receipts'
  });
  receipts.prototype.fields = [
    'receipt_id',
    'ref',
    'production_product_provider_id',
    'date',
    'note',
    'devise_id',
    'active'
  ];
  receipts.prototype.fieldsSearchMetas = [
    'ref',
    'production_product_provider_id',
    'date',
    'note'
  ];

  const production_product_providers = require('./production_product_providers');
  const devises = require('./devises');

  receipts.prototype.modelIncludes = {
    'production_product_providers': {
      model: production_product_providers
    },
    'devises': {
      model: devises
    }
  };
  receipts.associate = function(models) {
    receipts.belongsTo(models.production_product_providers, {
      foreignKey: 'production_product_provider_id'
    });
    receipts.belongsTo(models.devises, {
      foreignKey: 'devise_id'
    });
  };
  return receipts;
};
