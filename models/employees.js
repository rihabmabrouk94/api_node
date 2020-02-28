'use strict';
module.exports = (sequelize, DataTypes) => {
    const employees = sequelize.define('employees', {
        emp_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        emp_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        emp_lastname: {
            allowNull: true,
            type: DataTypes.STRING
        },
        emp_gender: {
            allowNull: true,
            type: DataTypes.STRING
        },
        emp_start_working_date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        emp_address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        emp_city: {
            allowNull: true,
            type: DataTypes.STRING
        },
        job_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        profile_image_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        emp_age: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        emp_rfid: {
            allowNull: true,
            type: DataTypes.STRING
        },
        emp_lastlogindate: {
            allowNull: true,
            type: DataTypes.DATE
        },
        emp_email: {
            allowNull: true,
            type: DataTypes.STRING
        },
        empstatus_id: {
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
        emp_matricule: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        skill_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    }, {
        tableName: 'employees'
    });
    employees.prototype.fields = [
        'emp_id',
        'emp_name',
        'emp_lastname',
        'emp_gender',
        'emp_start_working_date',
        'emp_address',
        'emp_city',
        'job_id',
        'profile_image_id',
        'emp_age',
        'emp_rfid',
        'emp_lastlogindate',
        'emp_email',
        'empstatus_id',
        'group_id',
        'active',
        'emp_matricule',
        'skill_id'
    ];
    employees.prototype.fieldsSearchMetas = [
        'emp_name',
        'emp_lastname',
        'emp_gender',
        'emp_start_working_date',
        'emp_city',
        'emp_age',
        'emp_rfid',
        'emp_email',
        'emp_lastlogindate',
        'emp_matricule'
    ];
    const groups = require('./groups');
    const status_employees = require('./status_employees');
    const jobs = require('./jobs');
    const efiles = require('./efiles');

    employees.prototype.modelIncludes = {
        'groups': {
            model: groups
        },
        'status_employees': {
            model: status_employees
        },
        'jobs': {
            model: jobs
        },
        'efiles': {
            model: efiles
        }
    };
    employees.associate = function (models) {
        employees.belongsTo(models.groups, {
            foreignKey: 'group_id'
        });
        employees.belongsTo(models.status_employees, {
            foreignKey: 'empstatus_id'
        });
        employees.belongsTo(models.jobs, {
            foreignKey: 'job_id'
        });
        employees.belongsTo(models.efiles, {
            foreignKey: 'profile_image_id'
        });
    };
    return employees;
};
