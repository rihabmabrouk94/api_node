'use strict';
module.exports = (sequelize, DataTypes) => {
  const stat_days = sequelize.define('stat_days', {
    stat_day_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date_to: {
      allowNull: true,
      type: DataTypes.STRING
    },
    nbr_user_online: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    total_box: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    nb_box_break_cat1: {
      allowNull: true,
      type: DataTypes.STRING
    },
    nb_box_break_cat2: {
      allowNull: true,
      type: DataTypes.STRING
    },
    work_time: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    nbr_user_absent: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    nb_bundle_group: {
      allowNull: true,
      type: DataTypes.STRING
    },
    total_time_bundle: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    total_bundle: {
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
    tableName: 'stat_days'
  });
  stat_days.prototype.fields = [
    'stat_day_id',
    'date_to',
    'nbr_user_online',
    'total_box',
    'nb_box_break_cat1',
    'nb_box_break_cat2',
    'work_time',
    'nbr_user_absent',
    'nb_bundle_group',
    'total_time_bundle',
    'total_bundle',
    'active'
  ];
  stat_days.prototype.fieldsSearchMetas = [
    'date_to',
    'nbr_user_online',
    'total_box',
    'nb_box_break_cat1',
    'nb_box_break_cat2',
    'work_time',
    'nbr_user_absent',
    'nb_bundle_group',
    'total_time_bundle',
    'total_bundle',
  ];
  stat_days.associate = function(models) {
 };
  return stat_days;
};
