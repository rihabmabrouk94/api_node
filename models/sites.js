'use strict';
module.exports = (sequelize, DataTypes) => {
    const Site = sequelize.define('sites', {
        site_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        site_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        site_email: {
            allowNull: true,
            type: DataTypes.STRING
        },
        site_phone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        site_technicalcontact: {
            allowNull: true,
            type: DataTypes.STRING
        },
        site_prodcontact: {
            allowNull: true,
            type: DataTypes.STRING
        },
        site_fax: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        site_address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        site_city: {
            allowNull: true,
            type: DataTypes.STRING
        },
        country_id: {
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
        tableName: 'sites'
    });
    Site.prototype.fields = [
        'site_id',
        'site_label',
        'client_id',
        'site_email',
        'site_phone',
        'site_technicalcontact',
        'site_prodcontact',
        'site_fax',
        'site_address',
        'site_city',
        'country_id',
        'active'
    ];
    Site.prototype.fieldsSearchMetas = [
        'site_label',
        'site_email',
        'site_phone',
        'site_technicalcontact',
        'site_prodcontact',
        'site_fax',
        'site_address',
        'site_city'];
    const countries = require('./countries');
    const clients = require('./clients');

    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    Site.prototype.modelIncludes = {
        'countries': {
            model: countries
        },
        'clients': {
            model: clients
        }
    };
    Site.associate = function (models) {
        Site.belongsTo(models.clients,
            {
                foreignKey: 'client_id'
            }
            ); // Will add client_id to site
        Site.belongsTo(models.countries, {foreignKey: 'country_id'}); // Will add site_country to site

    };
    return Site;
};
