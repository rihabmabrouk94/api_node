'use strict';
module.exports = (sequelize, DataTypes) => {
    const Countries = sequelize.define('countries', {
        country_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        country_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        country_code: {
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
        tableName: 'countries'
    });
    Countries.associate = function (models) {
        Countries.hasMany(models.clients, {
            foreignKey: 'client_id'
        });
    };

    Countries.prototype.fields = [
        'country_id',
        'country_name',
        'country_code',
        'active'
    ];
    Countries.prototype.fieldsSearchMetas = [
        'country_name',
        'country_code'
    ];
    return Countries;
};
