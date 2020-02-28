'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('clients', {
        client_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        client_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_phonenumber: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        client_email: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_technicalcontact: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_salescontact: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_fax: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        country_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        client_picpath: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_city: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        modelIncludes:  Sequelize.VIRTUAL
    }, {
        timestamps: false
    }, {
        tableName: 'clients'
    });

    Client.prototype.fields = [
        'client_id',
        'client_label',
        'client_address',
        'client_phonenumber',
        'client_email',
        'client_technicalcontact',
        'client_salescontact',
        'client_fax',
        'client_country',
        'client_picpath',
        'active',
        'client_city'
    ];
    Client.prototype.fieldsSearchMetas = [
        'client_label',
        'client_address',
        'client_phonenumber',
        'client_email',
        'client_technicalcontact',
        'client_salescontact',
        'client_fax',
        'client_city'
    ];
    const countries = require('./countries');

    Client.prototype.getModelIncludes = function() {
        return ['countries'];
    };
    Client.associate = function (models) {
        Client.belongsTo(models.countries, {
            foreignKey: 'country_id'
        });
    };
    return Client;
};
