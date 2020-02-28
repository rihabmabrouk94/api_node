'use strict';
module.exports = (sequelize, DataTypes) => {
    const servers = sequelize.define('servers', {
        server_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        server_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        server_ip: {
            allowNull: true,
            type: DataTypes.STRING
        },
        server_description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        server_status: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        server_deployed: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        server_uptime: {
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
        tableName: 'servers'
    });

    servers.prototype.fields = [
        'server_id',
        'server_label',
        'server_ip',
        'server_description',
        'server_status',
        'server_deployed',
        'server_uptime',
        'active'
    ];
    servers.prototype.fieldsSearchMetas = [
        'server_label',
        'server_ip',
        'server_description',
        'server_status',
        'server_deployed'
    ];
    servers.associate = function (models) {
        // associations can be defined here
    };
    return servers;
};
