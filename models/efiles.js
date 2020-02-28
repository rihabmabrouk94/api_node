'use strict';
module.exports = (sequelize, DataTypes) => {
    const efiles = sequelize.define('efiles', {
        file_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        file_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        original_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        file_title: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        created_at: {
            allowNull: true,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        uri: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        file_extension: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        file_type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        file_size: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        doc_type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        picture: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    }, {
        tableName: 'efiles'
    });

    efiles.prototype.fields = [
        'file_id',
        'file_name',
        'original_name',
        'file_title',
        'created_at',
        'updated_at',
        'active',
        'uri',
        'file_extension',
        'file_type',
        'file_size',
        'doc_type',
        'picture'
    ];
    efiles.associate = function (models) {
        // associations can be defined here
    };
    return efiles;
};
