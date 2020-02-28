'use strict';
module.exports = (sequelize, DataTypes) => {
    const bundles = sequelize.define('bundles', {
        bundle_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        order_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        operation_groupe_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        code_bundle: {
            allowNull: true,
            type: DataTypes.STRING
        },
        num_bundle: {
            allowNull: true,
            type: DataTypes.STRING
        },
        header_ref: {
            allowNull: true,
            type: DataTypes.STRING
        },
        variant1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        variant2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        variant3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        size1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        size2: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        cuo_id: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        cuo_pos: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        expr1: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        zu_tc_man3: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        zu_tc_man2: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        zu_tc_man4: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        zu_tc_man5: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        zu_tc_man6: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        bd_refid: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        bundle_qte: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        card_pcs: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        created_at: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        tag: {
            allowNull: true,
            type: DataTypes.STRING,
            // defaultValue: 'C5'
        },
        pushed_to_printer: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        printer_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        start_date: {
            allowNull: true,
            type:  DataTypes.DATE
        },
        finish_date: {
            allowNull: true,
            type:  DataTypes.DATE
        }
    }, {
        timestamps: false
    }, {
        tableName: 'bundles'
    });
    bundles.prototype.fields = [
        'bundle_id',
        'order_id',
        'operation_groupe_id',
        'code_bundle',
        'num_bundle',
        'header_ref',
        'variant1',
        'variant2',
        'variant3',
        'size1',
        'size2',
        'cuo_id',
        'cuo_pos',
        'expr1',
        'zu_tc_man3',
        'zu_tc_man2',
        'zu_tc_man4',
        'zu_tc_man5',
        'zu_tc_man6',
        'bd_refid',
        'bundle_qte',
        'card_pcs',
        'created_at',
        'updated_at',
        'tag',
        'pushed_to_printer',
        'printer_id',
        'active',
        'start_date',
        'finish_date'
    ];
    bundles.prototype.fieldsSearchMetas = [
        'order_id',
        'operation_groupe_id',
        'code_bundle',
        'num_bundle',
        'header_ref',
        'variant1',
        'variant2',
        'variant3',
        'size1',
        'size2',
        'cuo_id',
        'cuo_pos',
        'expr1',
        'zu_tc_man3',
        'zu_tc_man2',
        'zu_tc_man4',
        'zu_tc_man5',
        'zu_tc_man6',
        'bd_refid',
        'bundle_qte',
        'card_pcs',
        'created_at',
        'updated_at',
        'tag',
        'pushed_to_printer',
        'printer_id',
        'active',
        'start_date',
        'finish_date'
    ];
    const orders = require('./orders');
    const printers = require('./printers');
    const operation_groupes = require('./operation_groupes');

    bundles.prototype.modelIncludes = {
        'orders': {
            model: orders
        },
        'printers': {
            model: printers
        },
        'operation_groupes': {
            model: operation_groupes
        }
    };
    bundles.associate = function (models) {
        bundles.belongsTo(models.orders, {
            foreignKey: 'order_id'
        });
        bundles.belongsTo(models.printers, {
            foreignKey: 'printer_id'
        });
        bundles.belongsTo(models.operation_groupes, {
            foreignKey: 'operation_groupe_id'
        });
    };
    return bundles;
};
