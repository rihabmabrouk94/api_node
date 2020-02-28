'use strict';
module.exports = (sequelize, DataTypes) => {
  const priorities = sequelize.define('priorities', {
    id_priority: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
      },
    label: {
        allowNull: true,
        type: DataTypes.STRING
      },
      active: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: 'Y'
      },
    }, {
      timestamps: false
    }, {
      tableName: 'priorities'
    });
  priorities.prototype.fields = [
    'id_priority',
    'label',
    'active'
  ];
  priorities.associate = function(models) {
    // associations can be defined here
  };
  return priorities;
};
