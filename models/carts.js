'use strict';
module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('carts', {
    cart_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    rfid_cart: {
      allowNull: true,
      type: DataTypes.STRING
    },
    filename: {
      allowNull: true,
      type: DataTypes.STRING
    },
    message: {
      allowNull: true,
      type: DataTypes.STRING
    },
    created_at: {
      allowNull: true,
      type: DataTypes.STRING
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.STRING
    },
    print_start: {
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
    tableName: 'carts'
  });
  carts.prototype.fields = [
    'cart_id',
    'rfid_cart',
    'filename',
    'message',
    'created_at',
    'updated_at',
    'print_start',
    'active'
  ];
  carts.prototype.fieldsSearchMetas = [
    'label_break',
    'num_break',
    'categorie_break',
    'active'
  ];
  carts.associate = function(models) {
    // associations can be defined here
  };
  return carts;
};
