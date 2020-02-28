'use strict';
module.exports = (sequelize, DataTypes) => {
    const breaks = sequelize.define('breaks', {
        break_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        start_time: {
            allowNull: true,
            type: DataTypes.DATE
        },
        end_time: {
            allowNull: true,
            type: DataTypes.DATE
        },
        push_time: {
            allowNull: true,
            type: DataTypes.DATE
        },
        breaktype_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        usersession_id :{
            allowNull: true,
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    }, {
        tableName: 'breaks'
    });
    breaks.prototype.fields = [
        'break_id',
        'start_time',
        'end_time',
        'push_time',
        'breaktype_id',
        'usersession_id',
        'active'
    ];
    breaks.prototype.fieldsSearchMetas = [
        'start_time',
        'end_time',
        'push_time',
        'breaktype_id',
        'active'
    ];

    const break_types = require('./break_types');
    const usersessions = require('./usersessions');

    breaks.prototype.modelIncludes = {
        'break_types': {
            model: break_types
        },
        'usersessions': {
            model: usersessions
        }
    };
    breaks.associate = function (models) {
        breaks.belongsTo(models.break_types, {
            foreignKey: 'breaktype_id'
        });
        // breaks.belongsTo(models.employees, {
        //     foreignKey: 'supervisor_id',
        //     as : 'supervisor'
        // });
        breaks.belongsTo(models.usersessions, {
            foreignKey: 'usersession_id'
        });
    };
        return breaks;
    };
