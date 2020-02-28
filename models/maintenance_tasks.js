'use strict';
module.exports = (sequelize, DataTypes) => {
  const maintenance_tasks = sequelize.define('maintenance_tasks', {
    maintenance_task_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    maintenance_status_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    machine_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    department_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    bug_description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    owner_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    created_by: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    source: {
      allowNull: true,
      type: DataTypes.STRING
    },
    maintenance_template_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    repared_by: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    repared_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    machine_params_type_id:{
      allowNull: true,
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: false
  }, {
    tableName: 'maintenance_tasks'
  });
  maintenance_tasks.prototype.fields = [
    'maintenance_task_id',
    'created_at',
    'maintenance_status_id',
    'machine_id',
    'department_id',
    'bug_description',
    'owner_id',
    'created_by',
    'source',
      'maintenance_template_id',
    'active',
      'repared_by',
      'repared_at',
      'machine_params_type_id'
  ];
  maintenance_tasks.prototype.fieldsSearchMetas = [
    'created_at',
    'bug_description',
    'source',
      'repared_by',
      'repared_at'
  ];
  const status_maintenances = require('./status_maintenances');
  const jobs = require('./jobs');
  const users = require('./users');
  const machines = require('./machines');
  const employees = require('./employees');
  const maintenance_templates = require('./maintenance_templates');

  const machine_params_types = require('./machine_params_types');

  maintenance_tasks.prototype.modelIncludes = {
    'jobs': {
      model: jobs
    },
    'machines': {
      model: machines
    },
    'status_maintenances': {
      model: status_maintenances
    },
    'owner': {
      model: employees
    },
    'createdBy': {
      model: users
    },
    'maintenance_template_id': {
      model: maintenance_templates
    },
    'machine_params_types' : {
      model: machine_params_types
    }
  };

  maintenance_tasks.prototype.getModelIncludes = function() {
    return ['jobs','machines','status_maintenances','users', 'maintenance_templates'];
  };
  maintenance_tasks.associate = function(models) {
    maintenance_tasks.belongsTo(models.users, {
      foreignKey: 'created_by'
    });
    maintenance_tasks.belongsTo(models.employees, {
      foreignKey: 'owner_id'
    });
    maintenance_tasks.belongsTo(models.jobs, {
      foreignKey: 'department_id'
    });
    maintenance_tasks.belongsTo(models.machines, {
      foreignKey: 'machine_id'
    });
    maintenance_tasks.belongsTo(models.status_maintenances, {
      foreignKey: 'maintenance_status_id'
    });
    maintenance_tasks.belongsTo(models.maintenance_templates, {
      foreignKey: 'maintenance_template_id'
    });
    maintenance_tasks.belongsTo(models.machine_params_types, {
      foreignKey: 'machine_params_type_id'
    });
  };
  return maintenance_tasks;
};
