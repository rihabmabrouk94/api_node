'use strict';
module.exports = (sequelize, DataTypes) => {
  const production_product_providers = sequelize.define('production_product_providers', {
    production_product_provider_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    tel: {
      allowNull: true,
      type: DataTypes.STRING
    },
    fax: {
      allowNull: true,
      type: DataTypes.STRING
    },
    mail: {
      allowNull: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
    contact_person: {
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
    tableName: 'production_product_providers'
  });

  production_product_providers.prototype.fields = [
    'production_product_provider_id',
    'name',
    'tel',
    'fax',
    'mail',
    'active',
      'address',
    'contact_person',

  ];
  production_product_providers.prototype.fieldsSearchMetas = [
    'production_product_provider_id',
    'name',
    'tel',
    'fax',
    'mail',
    'active'

  ];


  production_product_providers.associate = function(models) {
    // associations can be defined here


  };
  return production_product_providers;
};
