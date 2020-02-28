'use strict';
module.exports = (sequelize, DataTypes) => {
  const line_articles = sequelize.define('line_articles', {
    line_article_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    line_id: {
      allowNull: true,
      type: DataTypes.INTEGER
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
    tableName: 'line_articles'
  });

  line_articles.prototype.fields = [
    'line_article_id',
    'line_id',
    'article_id',
    'active'
  ];
  line_articles.prototype.fieldsSearchMetas = [
    'line_id',
    'article_id'
  ];
  const lines = require('./lines');
  const articles= require('./articles')

  line_articles.prototype.modelIncludes = {
    'lines': {
      model: lines
    },
    'articles': {
      model: articles
    }
  };
  line_articles.associate = function(models) {
    line_articles.belongsTo(models.lines, {
      foreignKey: 'line_id'
    });
    line_articles.belongsTo(models.articles, {
      foreignKey: 'article_id'
    })  };
  return line_articles;
};
