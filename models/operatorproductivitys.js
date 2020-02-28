'use strict';
module.exports = (sequelize, DataTypes) => {
    const operatorproductivitys = sequelize.define('operatorproductivitys', {
        operatorproductivity_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        accordproductivity: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        excesscost: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        globalproductivity: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        cumulwage: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        period: {    
            allowNull: true,
            type: DataTypes.STRING
        },
        user_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        created_at: {
            allowNull: true,
            type: DataTypes.DATE
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue : 'Y'
        }

    },  {
        timestamps: false
    }, {
        tableName: 'operatorproductivitys'
    });

    operatorproductivitys.prototype.fields = [
        'operatorproductivity_id',
        'accordproductivity',
        'excesscost',
        'globalproductivity',
        'cumulwage',
        'date',
        'period',
        'user_id',
        'created_at',
        'active'
    ];

    operatorproductivitys.prototype.fieldsSearchMetas = [
        'accordproductivity',
        'excesscost',
        'globalproductivity',
        'cumulwage',
        'date',
        'period'
    ];

    const users = require('./users');

    operatorproductivitys.prototype.modelIncludes = {
        'users': {
            model: users
        }
    }

    operatorproductivitys.associate = function (models) {
        operatorproductivitys.belongsTo(models.users, {
            foreignKey: 'user_id'
        });
    };
    return operatorproductivitys;
};
