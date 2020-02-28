'use strict';
module.exports = (sequelize, DataTypes) => {
  const deposits = sequelize.define('deposits', {
    deposit_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    note: {
      allowNull: true,
      type: DataTypes.STRING
    },
    article_id: {
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
    tableName: 'deposits'
  });

  deposits.prototype.fields = [
    'deposit_id',
    'name',
    'note',
    'article_id',
    'article_id',
    'active'
  ];
  deposits.prototype.fieldsSearchMetas = [
    'deposit_id',
    'name',
    'note',
    'article_id',
    'article_id',
    'active'

  ];

  const articles = require('./articles');
  deposits.prototype.modelIncludes = {
    'articles': {
      model: articles
    }
  }

  deposits.prototype.getModelIncludes = function() {
    return [ 'articles'];
  };

  deposits.associate = function(models) {
    deposits.belongsTo(models.articles, {
      foreignKey: 'article_id'
    });
  };
  return deposits;
};
