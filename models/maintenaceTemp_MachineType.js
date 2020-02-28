'use strict';
module.exports = (sequelize, DataTypes) => {
  const m_template_m_type = sequelize.define('maintenaceTemp_machineTypes', {
    id:{
    allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
},
    machine_type_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    maintenance_template_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active:{
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
  }, {
    timestamps: false
  }, {
    tableName: 'maintenaceTemp_machineTypes'
  });
  m_template_m_type.prototype.fields = [
    'id',
    'machine_type_id',
    'maintenance_template_id',
    'active'
  ];
  m_template_m_type.associate = function(models) {
    // associations can be defined here
    m_template_m_type.belongsTo(models.machine_types, {
      foreignKey: 'machine_type_id'
    });
    m_template_m_type.belongsTo(models.maintenance_templates, {
      foreignKey: 'maintenance_template_id'
    });
  };
  return m_template_m_type;
};
