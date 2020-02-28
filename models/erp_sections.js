'use strict';
module.exports = (sequelize, DataTypes) => {
    const erp_sections = sequelize.define('erp_sections', {
        esec_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        esec_label: {
            allowNull: true,
            type: DataTypes.STRING
        },
        esec_userlevel: {
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
        tableName: 'erp_sections'
    });
    erp_sections.prototype.fields = [
        'esec_id',
        'esec_label',
        'esec_userlevel',
        'active'
    ];
    erp_sections.prototype.fieldsSearchMetas = [
        'esec_label',
        'esec_userlevel'
    ];
    erp_sections.associate = function (models) {
        // associations can be defined here
    };
    return erp_sections;
};
