'use strict';
module.exports = (sequelize, DataTypes) => {
    const status_employees = sequelize.define('status_employees', {
        empstatus_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        empstatus_label: {
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
        tableName: 'status_employees'
    });
    status_employees.prototype.fields = [
        'empstatus_id',
        'empstatus_label',
    'active'];
    status_employees.associate = function (models) {
        // associations can be defined here
    };
    return status_employees;
};
