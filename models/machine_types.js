'use strict';
module.exports = (sequelize, DataTypes) => {
    const machine_types = sequelize.define('machine_types', {
        machine_type_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        oil_change: {
            allowNull: true,
            type: DataTypes.STRING
        },
        general_revision: {
            allowNull: true,
            type: DataTypes.STRING
        },
        other_revision: {
            allowNull: true,
            type: DataTypes.STRING
        },
        machine_brand: {
            allowNull: true,
            type: DataTypes.STRING
        },
        type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        code: {
            allowNull: true,
            type: DataTypes.STRING
        },
        model: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        blocage_code: {
            allowNull: true,
            type: DataTypes.STRING
        }

    }, {
        timestamps: false
    }, {
        tableName: 'machine_types'
    });


    machine_types.prototype.fields = [
        'machine_type_id',
        'oil_change',
        'general_revision',
        'other_revision',
        'machine_brand',
        'type',
        'code',
        'model',
        'active',
        'blocage_code'
    ];
    machine_types.prototype.fieldsSearchMetas = [
        'oil_change',
        'general_revision',
        'other_revision',
        'machine_brand',
        'type',
        'code',
        'model',
        'blocage_code'

    ];
    machine_types.associate = function (models) {
        // associations can be defined here
    };
    return machine_types;
};
