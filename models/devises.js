'use strict';
module.exports = (sequelize, DataTypes) => {
  const devises = sequelize.define('devises', {
    devise_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    symbol: {
      allowNull: true,
      type: DataTypes.STRING
    },
    conversion_value: {
      allowNull: true,
      type: DataTypes.STRING
    },
    conversion_date: {
      allowNull: true,
      type: DataTypes.STRING
    },
    origin_name: {
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
    tableName: 'devises'
  });
  devises.prototype.fields = [
    'devise_id',
    'name',
    'code',
    'symbol',
    'conversion_value',
    'conversion_date',
    'origin_name',
    'active'
  ];
  devises.associate = function(models) {
    // associations can be defined here
  };
  return devises;
};
