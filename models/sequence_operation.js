'use strict';
module.exports = (sequelize, DataTypes) => {
  const sequence_operation = sequelize.define('sequence_operations', {
    sequence_operation_id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
      type: DataTypes.INTEGER
    },
    stitchcount: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    coupe_fil: {
      allowNull: true,
      type: DataTypes.STRING
    },
    parent_sequence: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    back_stitch: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    sequence_order: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    picture_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    operation_template_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    back_stich_positive_tolerence: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    back_stich_negative_tolerence: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    stitchcount_positive_tolerence: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    stitchcount_negative_tolerence: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    operation_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    description:{
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  }, {
    tableName: 'sequence_operations'
  });
  sequence_operation.associate = function(models) {
    // associations can be defined here
  };
  return sequence_operation;
};
