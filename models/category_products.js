'use strict';
module.exports = (sequelize, DataTypes) => {
  const category_products = sequelize.define('category_products', {
    category_product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    libelle: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'category_products'
  });

  category_products.prototype.fields = [
    'category_product_id',
    'libelle',
    'description',
      'active'
  ];
  category_products.prototype.fieldsSearchMetas = [
    'category_product_id',
    'libelle',
    'description'
  ]


  category_products.associate = function(models) {
    // associations can be defined here
  };
  return category_products;
};
