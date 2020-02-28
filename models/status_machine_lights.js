'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine_light_status = sequelize.define('status_machine_lights', {
    status_machine_light_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: {
      allowNull: false,
      type: DataTypes.STRING
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING
    },
    metas: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    timestamps: false
  }, {
    tableName: 'status_machine_lights'
  });

  machine_light_status.prototype.fields = [
    'status_machine_light_id',
    'label',
    'code',
    'metas'
  ];

  machine_light_status.prototype.fieldsSearchMetas = [
    'status_machine_light_id',
    'label',
    'code',
    'metas'
  ];

  machine_light_status.prototype.modelIncludes = {

  }
  machine_light_status.associate = function(models) {
    // associations can be defined here
  };
  return machine_light_status;
};
