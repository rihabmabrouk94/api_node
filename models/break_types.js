'use strict';
module.exports = (sequelize, DataTypes) => {
  const break_types = sequelize.define('break_types', {
    break_type_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label_break: {
      allowNull: true,
      type: DataTypes.STRING
    },
    num_break: {
      allowNull: true,
      type: DataTypes.STRING
    },
    category_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    need_validation:{
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  }, {
    tableName: 'break_types'
  });
  break_types.prototype.fields = [
    'break_type_id',
    'label_break',
    'num_break',
    'category_id',
    'active',
    'need_validation'
  ];
  break_types.prototype.fieldsSearchMetas = [
    'label_break',
    'num_break',
    'category_id',
    'active',
    'need_validation'
  ];
  const break_type_categories = require('./break_type_categories');
  break_types.prototype.modelIncludes = {
    'break_type_categories': {
      model: break_type_categories
    }
  }
  break_types.associate = function(models) {
    break_types.belongsTo(models.break_type_categories, {
      foreignKey: 'category_id'
    });  };
  return break_types;
};
