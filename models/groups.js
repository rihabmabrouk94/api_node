'use strict';
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('groups', {
        group_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        group_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        group_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        site_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
    }, {
        timestamps: false
    }, {
        tableName: 'groups'
    });
    Group.prototype.fields = [
        'group_id',
        'group_label',
        'group_description',
        'site_id',
        'active'
    ];
    Group.prototype.fieldsSearchMetas = [
        'group_label',
        'group_description'
    ];
    const sites = require('./sites');

    Group.prototype.modelIncludes = {
        'sites': {
            model: sites
        }
    };


    Group.associate = function (models) {
        Group.belongsTo(models.sites, {
            foreignKey: 'site_id'
        }); // Will add site_id to group
        Group.hasMany(models.users, {
            foreignKey: 'group_id'
        });
    };
    return Group;
};
