'use strict';
module.exports = (sequelize, DataTypes) => {
  const article_operation_templates = sequelize.define('article_operation_templates', {
    article_operation_template_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    article_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_template_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'article_operation_templates'
  });
  article_operation_templates.prototype.fields = [
    'article_operation_template_id',
    'article_id',
    'operation_template_id',
    'active'
  ];
  article_operation_templates.prototype.fieldsSearchMetas = [
    'article_operation_template_id',
    'article_id',
    'operation_template_id',
    'active'
  ];
  const articles = require('./articles');
  const operation_templates = require('./operation_templates');
  article_operation_templates.prototype.modelIncludes = {
    'articles': {
      model: articles
    },
    'operation_templates': {
      model: operation_templates
    }
  };
  article_operation_templates.associate = function(models) {
    article_operation_templates.belongsTo(models.articles, {
      foreignKey: 'article_id'
    });

    article_operation_templates.belongsTo(models.operation_templates, {
      foreignKey: 'operation_template_id'
    });  };
  return article_operation_templates;
};
