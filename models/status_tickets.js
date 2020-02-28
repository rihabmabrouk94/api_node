'use strict';
module.exports = (sequelize, DataTypes) => {
  const status_tickets = sequelize.define('status_tickets', {
    id: {
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
    tableName: 'status_tickets'
  });
  status_tickets.prototype.fields = [
    'id',
    'label',
    'code',
    'active'
  ];
  status_tickets.prototype.fieldsSearchMetas = [
    'label',
    'code'
  ];
  status_tickets.associate = function(models) {
    // associations can be defined here
  };
  return status_tickets;
};
