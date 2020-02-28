'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const direct_production_modes = sequelize.define('direct_production_modes', {
    direct_production_mode_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label : {
      allowNull: true,
      type: DataTypes.STRING
    },
    description : {
      allowNull: true,
      type: DataTypes.STRING
    },
    order_prefix : {
      allowNull: true,
      type: DataTypes.STRING
    },
    bundle_prefix : {
      allowNull: true,
      type: DataTypes.STRING
    },
    bundle_varient : {
      allowNull: true,
      type: DataTypes.STRING
    },
    article_id : {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
  //  modelIncludes:  Sequelize.VIRTUAL
  }, {
    timestamps: false
  }, {
    tableName: 'direct_production_modes'
  });
  direct_production_modes.prototype.fields = [
    'direct_production_mode_id',
    'label',
    'description',
    'order_prefix',
    'bundle_prefix',
    'bundle_varient',
    'article_id',
    'active'
  ];
  direct_production_modes.prototype.fieldsSearchMetas = [
    'article_operation_template_id',
    'article_id',
    'operation_template_id',
    'active'
  ];

  direct_production_modes.associate = function(models) {
    direct_production_modes.belongsTo(models.articles, {
      foreignKey: 'article_id'
    });
  };

  const articles = require('./articles');
  direct_production_modes.prototype.getModelIncludes = function() {
    return ['articles'];
  };

  direct_production_modes.prototype.modelIncludes = {
    'articles': {
      model: articles
    }
  };
  return direct_production_modes;
};
