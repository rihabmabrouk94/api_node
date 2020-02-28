'use strict';
module.exports = (sequelize, DataTypes) => {
  const break_type_categories = sequelize.define('break_type_categories', {
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_label: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    category_code:{
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  }, {
    tableName: 'break_type_categories'
  });
  break_type_categories.prototype.fields = [
    'category_id',
    'category_label',
    'category_code',
    'active'
  ];
  break_type_categories.prototype.fieldsSearchMetas = [
    'category_label',
    'category_code',

  ];
  break_type_categories.associate = function(models) {
    // associations can be defined here
  };
  return break_type_categories;
};
