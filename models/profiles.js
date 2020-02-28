'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profiles', {
        profile_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        profile_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        profile_allowedsections: {
            allowNull: true,
            type: DataTypes.STRING
        },
        profile_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        has_update: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'N'
        },
        has_delete: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'N'
        },
        has_save: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'N'
        },
        permissions: Sequelize.VIRTUAL
    }, {
        timestamps: false
    }, {
        tableName: 'profiles'
    });

    Profile.prototype.fields = [
        'profile_id',
        'profile_label',
        'profile_allowedsections',
        'profile_description',
        'active',
        'has_update',
        'has_delete',
        'has_save'
    ];
    Profile.prototype.fieldsSearchMetas = [
        'profile_label',
        'profile_allowedsections',
        'profile_description'
    ];
    Profile.associate = function (models) {
        Profile.hasMany(models.users, {foreignKey: 'profile_id'});
    };
    return Profile;
};
