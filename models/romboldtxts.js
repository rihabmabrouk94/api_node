'use strict';
module.exports = (sequelize, DataTypes) => {
  const romboldtxts = sequelize.define('romboldtxts', {
    romboldtxt_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    header_ref: {
      allowNull: true,
      type: DataTypes.STRING
    },
    package_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    package_bc: {
      allowNull: true,
      type: DataTypes.STRING
    },
    model: {
      allowNull: true,
      type: DataTypes.STRING
    },
    variant1: {
      allowNull: true,
      type: DataTypes.INTEGER
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
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    customer_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    cuo_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    cuo_pos: {
      allowNull: true,
      type: DataTypes.STRING
    },
    expr1: {
      allowNull: true,
      type: DataTypes.STRING
    },
    zu_tc_man3: {
      allowNull: true,
      type: DataTypes.STRING
    },
    zu_tc_man2: {
      allowNull: true,
      type: DataTypes.STRING
    },
    zu_tc_man4: {
      allowNull: true,
      type: DataTypes.STRING
    },
    zu_tc_man5: {
      allowNull: true,
      type: DataTypes.STRING
    },
    zu_tc_man6: {
      allowNull: true,
      type: DataTypes.STRING
    },
    bd_refid: {
      allowNull: true,
      type: DataTypes.STRING
    },
    card_pcs: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: true,
      type: DataTypes.STRING
    },
    order_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    }
  }, {
    timestamps: false
  }, {
    tableName: 'romboldtxts'
  });
  romboldtxts.prototype.fields = [
    'romboldtxt_id',
    'header_ref',
    'package_id',
    'package_bc',
    'model',
    'variant1',
    'variant2',
    'variant3',
    'size1',
    'size2',
    'quantity',
    'customer_id',
    'cuo_id',
    'cuo_pos',
    'expr1',
    'zu_tc_man3',
    'zu_tc_man2',
    'zu_tc_man4',
    'zu_tc_man5',
    'zu_tc_man6',
    'bd_refid',
    'card_pcs',
    'created_at',
    'order_id',
    'active'
  ];
  romboldtxts.prototype.fieldsSearchMetas = [
    'header_ref',
    'package_id',
    'package_bc',
    'model',
    'variant1',
    'variant2',
    'variant3',
    'size1',
    'size2',
    'quantity',
    'customer_id',
    'cuo_id',
    'cuo_pos',
    'expr1',
    'zu_tc_man3',
    'zu_tc_man2',
    'zu_tc_man4',
    'zu_tc_man5',
    'zu_tc_man6',
    'bd_refid',
    'card_pcs',
    'created_at',
    'order_id',
  ];
  const orders = require('./orders');
  romboldtxts.prototype.modelIncludes = {
    'orders': {
      model: orders
    }
  };
  romboldtxts.associate = function(models) {
    romboldtxts.belongsTo(models.orders, {
      foreignKey: 'order_id'
    });
  };
  return romboldtxts;
};
