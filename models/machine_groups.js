'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine_groups = sequelize.define('machine_groups', {
    machine_group_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    machine_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    group_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },

  }, {
    timestamps: false
  }, {
    tableName: 'machine_groups'
  });
  machine_groups.prototype.fields = [
    'machine_group_id',
    'machine_id',
    'group_id',
    'active'
  ];
  machine_groups.associate = function(models) {
    machine_groups.belongsTo(models.machines, {
      foreignKey: 'machine_id'
    });

    machine_groups.belongsTo(models.groups, {
      foreignKey: 'group_id'
    });
  };
  return machine_groups;
};
