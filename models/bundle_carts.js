'use strict';
module.exports = (sequelize, DataTypes) => {
    const bundle_carts = sequelize.define('bundle_carts', {
            bundle_cart_id: {
                allowNull: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            bundle_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            cart_id: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            affected_at: {
                allowNull: true,
                type: DataTypes.STRING
            },
            nbcarts: {
                allowNull: true,
                type: DataTypes.INTEGER
            },

            active: {
                allowNull: true,
                type: DataTypes.BOOLEAN,
                defaultValue: 'Y'
            }
        }, {
            timestamps: false
        }, {
            tableName: 'bundle_carts'
        }
    );

    bundle_carts.prototype.fields = [
        'bundle_cart_id',
        'bundle_id',
        'cart_id',
        'affected_at',
        'nbcarts',
        'active'
    ];

    bundle_carts.prototype.fieldsSearchMetas = [
        'affected_at',
        'nbcarts'
    ];

    const carts = require('./carts');
    const bundles = require('./bundles');

    bundle_carts.prototype.modelIncludes = {
        'carts': {
            model: carts
        },
        'bundles': {
            model: bundles
        }
    }

    bundle_carts.associate = function (models) {
        // associations can be defined here
        bundle_carts.belongsTo(models.carts, {
            foreignKey: 'cart_id'
        });

        bundle_carts.belongsTo(models.bundles, {
            foreignKey: 'bundle_id'
        });
    };
    return bundle_carts;
};
