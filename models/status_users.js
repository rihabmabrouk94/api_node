'use strict';
module.exports = (sequelize, DataTypes) => {
    const status_users = sequelize.define('status_users', {
        user_statusid: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_statuslabel: {
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
        tableName: 'status_users'
    });
    status_users.prototype.fields = [
        'user_statusid',
        'user_statuslabel',
        'active'
    ];
    status_users.associate = function (models) {
        // associations can be defined here
    };
    return status_users;
};
