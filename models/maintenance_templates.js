'use strict';
module.exports = (sequelize, DataTypes) => {
  const maintenance_templates = sequelize.define('maintenance_templates', {
    maintenance_template_id: {
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
    departement_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    machine_type_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  }, {
    tableName: 'maintenance_templates'
  });
  maintenance_templates.prototype.fields = [
    'maintenance_template_id',
    'label',
    'active',
    'departement_id',
    'machine_type_id'
  ];
  maintenance_templates.prototype.fieldsSearchMetas = [
    'maintenance_template_id',
    'label',
    'active',
    'departement_id',
    'machine_type_id'
  ];
  const jobs = require('./jobs');
  const machine_types = require('./machine_types');
  maintenance_templates.prototype.modelIncludes = {
    'jobs': {
      model: jobs
    },
    'machine_types' : {
      model : machine_types
    }
  }
  maintenance_templates.prototype.getModelIncludes = function() {
    return ['jobs', 'machine_types'];
  };
  maintenance_templates.associate = function(models) {
    // associations can be defined here
    maintenance_templates.belongsTo(models.jobs, {
      foreignKey: 'departement_id'
    });
    maintenance_templates.belongsTo(models.machine_types, {
      foreignKey: 'machine_type_id'
    });
  };
  return maintenance_templates;
};
