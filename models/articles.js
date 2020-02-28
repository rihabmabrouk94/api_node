'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('articles', {
    article_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    label: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'articles'
  });
  article.prototype.fields = [
    'article_id',
    'code',
    'label',
    'description',
    'active'
  ];
  article.prototype.fieldsSearchMetas = [
    'code',
    'label',
    'description'
  ];
  article.associate = function(models) {
    // associations can be defined here
  };
  return article;
};
