'use strict';
module.exports = (sequelize, DataTypes) => {
  const workfiles = sequelize.define('workfiles', {
    workfiles_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    wfid: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    datestart: {
      allowNull: true,
      type: DataTypes.DATE
    },
    dateend: {
      allowNull: true,
      type: DataTypes.DATE
    },
    duration: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    type: {
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
    tableName: 'workfiles'
  });
  workfiles.prototype.fields = [
    'workfiles_id',
    'wfid',
    'datestart',
    'dateend',
    'duration',
    'type',
    'active'
  ];
  workfiles.prototype.fieldsSearchMetas = [
    'wfid',
    'datestart',
    'dateend',
    'duration',
    'type',
  ];
  workfiles.associate = function(models) {
    // associations can be defined here
  };
  return workfiles;
};
