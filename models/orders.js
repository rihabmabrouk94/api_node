'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: {
      allowNull: true,
      type: DataTypes.STRING
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    article_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    client_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    total_bundle: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    bundle_generated: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  }, {
    tableName: 'orders'
  });
  orders.prototype.fields = [
    'order_id',
    'label',
    'code',
    'description',
    'quantity',
    'article_id',
    'client_id',
    'active',
      'total_bundle',
      'bundle_generated'
  ];
  orders.prototype.fieldsSearchMetas = [
      'order_id',
    'label',
    'code',
    'description',
    'quantity',
    'article_id',
    'client_id',
    'active',
      'bundle_generated',
      'total_bundle'
  ];
  const articles = require('./articles');
  const clients = require('./clients');

  orders.prototype.modelIncludes = {
    'articles': {
      model: articles
    },
    'clients': {
      model: clients
    }
  };
  orders.associate = function(models) {
    orders.belongsTo(models.articles, {
      foreignKey: 'article_id'
    });
    orders.belongsTo(models.clients, {
      foreignKey: 'client_id'
    });
  };
  return orders;
};
