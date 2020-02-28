'use strict';
module.exports = (sequelize, DataTypes) => {
    const permissions = sequelize.define('permissions', {
        permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        permission_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        level: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        parent_menu: {
            allowNull: true,
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    }, {
        tableName: 'permissions'
    });
    permissions.associate = function (models) {
        // associations can be defined here
    };

    permissions.prototype.fields = [
        'permission_id',
        'permission_label',
        'active',
    'level',
    ];

    permissions.associate = function (models) {
        permissions.belongsTo(models.permissions, {
            foreignKey: 'parent_menu'
        });
    };
    return permissions;
};
