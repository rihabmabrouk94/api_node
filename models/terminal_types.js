'use strict';
module.exports = (sequelize, DataTypes) => {
    const terminal_types = sequelize.define('terminal_types', {
        Tt_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        Tt_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Tt_description: {
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
        tableName: 'terminal_types'
    });
    terminal_types.prototype.fields = [
        'Tt_id',
        'Tt_label',
        'Tt_description',
        'active'
    ];
    terminal_types.associate = function (models) {
        // associations can be defined here
    };
    return terminal_types;
};
