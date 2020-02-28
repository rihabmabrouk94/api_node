'use strict';
module.exports = (sequelize, DataTypes) => {
    const status_machines = sequelize.define('status_machines', {
        sm_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        sm_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        sm_description: {
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
        tableName: 'status_machines'
    });
    status_machines.prototype.fields = [
        'sm_id',
        'sm_label',
        'sm_description',
        'active'
    ];
    status_machines.associate = function (models) {
        // associations can be defined here
    };
    return status_machines;
};
