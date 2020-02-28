'use strict';
module.exports = (sequelize, DataTypes) => {
  const maintenance_feeds = sequelize.define('maintenance_feeds', {
    maintenance_feed_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    maintenance_task_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    started_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    finished_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    duration: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    status_maintenance_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    department_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    repared_by: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    feed_description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    usersession_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    finished: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    maintenance_template_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {
    timestamps: false
  }, {
    tableName: 'maintenance_feeds'
  });
  maintenance_feeds.prototype.fields = [
    'maintenance_feed_id',
    'maintenance_task_id',
    'started_at',
    'finished_at',
    'duration',
    'status_maintenance_id',
    'department_id',
    'repared_by',
    'feed_description',
    'active',
    'usersession_id',
    'maintenance_template_id',
    'finished'
  ];
  maintenance_feeds.prototype.fieldsSearchMetas = [
    'started_at',
    'finished_at',
    'duration',
    'feed_description',
      'finished'
  ];
  const jobs = require('./jobs');
  const employees = require('./employees');
  const maintenance_tasks = require('./maintenance_tasks');
  const status_maintenances = require('./status_maintenances');
  const usersessions = require('./usersessions');
  const maintenance_templates = require('./maintenance_templates');

  maintenance_feeds.prototype.modelIncludes = {
    'jobs': {
      model: jobs
    },
    'maintenance_tasks': {
      model: maintenance_tasks
    },
    'status_maintenances': {
      model: status_maintenances
    },
    'reparedBy': {
      model: employees
    },
    'usersession': {
      model: usersessions
    },
    'maintenance_templates': {
      model: maintenance_templates
    },
  };
  maintenance_feeds.associate = function(models) {
    maintenance_feeds.belongsTo(models.employees, {
      foreignKey: 'repared_by'
    });
    maintenance_feeds.belongsTo(models.jobs, {
      foreignKey: 'department_id'
    });
    maintenance_feeds.belongsTo(models.maintenance_tasks, {
      foreignKey: 'maintenance_task_id'
    });
    maintenance_feeds.belongsTo(models.status_maintenances, {
      foreignKey: 'status_maintenance_id'
    });

    maintenance_feeds.belongsTo(models.usersessions, {
      foreignKey: 'usersession_id'
    });
    maintenance_feeds.belongsTo(models.maintenance_templates, {
      foreignKey: 'maintenance_template_id'
    });
  }
  return maintenance_feeds;
};
