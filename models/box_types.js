'use strict';
module.exports = (sequelize, DataTypes) => {
    const box_types = sequelize.define('box_types', {
        bt_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        bt_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        bt_description: {
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
        tableName: 'box_types'
    });
    box_types.prototype.fields = [
        'bt_id',
        'bt_label',
        'bt_description',
        'active',
    ];
    box_types.associate = function (models) {
        // associations can be defined here
    };
    return box_types;
};
