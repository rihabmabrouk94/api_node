'use strict';
module.exports = (sequelize, DataTypes) => {
    const gateway_types = sequelize.define('gateway_types', {
        gwt_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        gwt_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        }
    }, {
        timestamps: false
    }, {
        tableName: 'gateway_types'
    });
    gateway_types.prototype.fields = [
        'gwt_id',
        'gwt_label',
        'active'
    ];
    gateway_types.associate = function (models) {
        // associations can be defined here
    };
    return gateway_types;
};
