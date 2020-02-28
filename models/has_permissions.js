'use strict';
module.exports = (sequelize, DataTypes) => {
    const has_permissions = sequelize.define('has_permissions', {
        has_permissions_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        has_permissions_permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        has_permissions_profild_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    }, {
        tableName: 'has_permissions'
    });
    has_permissions.associate = function (models) {

        has_permissions.belongsTo(models.permissions, {
            foreignKey: 'has_permissions_permission_id'
        });

        has_permissions.belongsTo(models.profiles, {
            foreignKey: 'has_permissions_profild_id'
        });
    };
    return has_permissions;
};