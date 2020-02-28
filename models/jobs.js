'use strict';
module.exports = (sequelize, DataTypes) => {
    const jobs = sequelize.define('jobs', {
        job_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        job_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        job_description: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        }

    }, {
        timestamps: false
    }, {
        tableName: 'jobs'
    });

    jobs.prototype.fields = [
        'job_id',
        'job_name',
        'job_description',
        'active'
    ];
    jobs.prototype.fieldsSearchMetas = [
        'job_name',
        'job_description'
    ];
    jobs.associate = function (models) {
        // associations can be defined here
    };
    return jobs;
};
