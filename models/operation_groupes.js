'use strict';
module.exports = (sequelize, DataTypes) => {
    const operation_groupes = sequelize.define('operation_groupes', {
        operation_groupe_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true
        },
        order_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            dataValues: 'Y'
        },
    }, {
        timestamps: false
    }, {
        tableName: 'operation_groupes'
    });

    operation_groupes.prototype.fields = [
        'operation_groupe_id',
        'order_id',
        'label',
        'description',
        'active'
    ];

    operation_groupes.prototype.fieldsSearchMetas = [
        'label',
        'description'
    ];

    const orders = require('./orders');

    operation_groupes.prototype.modelIncludes = {
        'orders': {
            model: orders
        }
    }
    operation_groupes.associate = function (models) {
        operation_groupes.belongsTo(models.orders, {
            foreignKey: 'order_id'
        });
    };
    return operation_groupes;
};
