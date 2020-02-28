'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine_event_types = sequelize.define('machine_event_types', {
    machine_event_type_id: {
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
    tableName: 'machine_event_types'
  });

  machine_event_types.prototype.fields = [
    'machine_event_type_id',
    'label',
    'code',
    'active'
  ];
  machine_event_types.prototype.fieldsSearchMetas = [
    'machine_event_type_id',
    'label',
    'code',
    'active'
  ];

  machine_event_types.associate = function(models) {
    // associations can be defined here
  };
  return machine_event_types;
};
