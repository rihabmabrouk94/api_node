'use strict';
module.exports = (sequelize, DataTypes) => {
  const skills = sequelize.define('skills', {
    skill_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    skill_label: {
      allowNull: true,
      type: DataTypes.STRING
    },
    skill_description: {
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
    tableName: 'skills'
  });
  skills.prototype.fields = [
    'skill_id',
    'skill_label',
    'skill_description',
    'active'
  ];
  skills.prototype.fieldsSearchMetas = [
    'skill_label',
    'skill_description'
  ];
  skills.associate = function(models) {
    // associations can be defined here
  };
  return skills;
};
