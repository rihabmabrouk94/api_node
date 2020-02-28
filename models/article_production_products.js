'use strict';
module.exports = (sequelize, DataTypes) => {
  const article_production_products = sequelize.define('article_production_products', {
    article_production_product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    article_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    production_product_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    quantity: {
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
    tableName: 'article_production_products'
  });

  article_production_products.prototype.fields = [
    'article_production_product_id',
    'article_id',
    'production_product_id',
    'active'
  ];

  article_production_products.prototype.fieldsSearchMetas = [
    'article_production_product_id',
    'article_id',
    'production_product_id',
    'active'
  ];

  const articles = require('./articles');
  const production_products = require('./production_products');

  article_production_products.prototype.modelIncludes = {
    'articles': {
      model: articles
    },
    'production_products': {
      model: production_products
    }
  };

  article_production_products.prototype.getModelIncludes = function() {
    return ['production_products', 'articles'];
  };

  article_production_products.associate = function(models) {
    article_production_products.belongsTo(models.articles, {
      foreignKey: 'article_id'
    });
    article_production_products.belongsTo(models.production_products, {
      foreignKey: 'production_product_id'
    });
  };
  return article_production_products;
};
