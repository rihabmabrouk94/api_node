'use strict';
module.exports = (sequelize, DataTypes) => {
  const production_products = sequelize.define('production_products', {
    production_product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    operation_template_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    buy_price: {
      allowNull: true,
      type: DataTypes.DOUBLE
    },
    picture_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    sku: {
      allowNull: true,
      type: DataTypes.STRING
    },
    use_in_production: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    category_product_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  }, {
    tableName: 'production_products'
  });

  production_products.prototype.fields = [
    'production_product_id',
    'name',
    'description',
    'buy_price',
    'operation_template_id',
    'active',
    'picture_id',
    'sku',
     'use_in_production',
     'category_product_id'
  ];
  production_products.prototype.fieldsSearchMetas = [
    'production_product_id',
    'name',
    'description',
    'buy_price',
    'operation_template_id',
    'active',
    'picture_id',
    'sku',
    'use_in_production',
    'category_product_id'

  ];

  const operation_templates = require('./operation_templates');
  const category_products = require('./category_products');
  const efiles = require('./efiles');

  production_products.prototype.modelIncludes = {
    'category_products': {
      model: category_products
    },

    'operation_templates': {
      model: operation_templates
    },

    'efiles': {
      model: efiles
    }
  }

  production_products.prototype.getModelIncludes = function() {
    return [ 'category_products', 'operation_templates', 'efiles'];
  }

  production_products.associate = function(models) {

    production_products.belongsTo(models.category_products, {
      foreignKey: 'category_product_id'
    });
    production_products.belongsTo(models.operation_templates, {
      foreignKey: 'operation_template_id'
    });
    production_products.belongsTo(models.efiles, {
      foreignKey: 'picture_id'
    });
  }

  return production_products;

}
