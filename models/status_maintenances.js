'use strict';
module.exports = (sequelize, DataTypes) => {
  const status_maintenances = sequelize.define('status_maintenances', {
    status_maintenance_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: {
      allowNull: true,
      type: DataTypes.STRING
    },
    code: {
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
    tableName: 'status_maintenances'
  });
  status_maintenances.prototype.fields = [
    'status_maintenance_id',
    'label',
    'code',
    'active'
  ];
  status_maintenances.prototype.fieldsSearchMetas = [
    'label',
    'code'
  ];
  status_maintenances.associate = function(models) {
    // associations can be defined here
  };
  return status_maintenances;
};
