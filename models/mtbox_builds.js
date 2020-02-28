'use strict';
module.exports = (sequelize, DataTypes) => {
  const mtbox_builds = sequelize.define('mtbox_builds', {
    mtbox_build_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    version: {
      allowNull: true,
      type: DataTypes.STRING
    },
    note: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    efile_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  }, {
    tableName: 'mtbox_builds'
  });

  mtbox_builds.prototype.fields = [
    'mtbox_build_id',
    'version',
    'note',
    'efile_id'
  ];
  mtbox_builds.prototype.fieldsSearchMetas = [
    'mtbox_build_id',
    'version',
    'note',
    'efile_id'
  ];

  const efiles = require('./efiles');
  mtbox_builds.prototype.modelIncludes = {
    'efiles': {
      model: efiles
    }
  }
  mtbox_builds.prototype.getModelIncludes = function() {
    return ['efiles'];
  };
  mtbox_builds.associate = function(models) {
    mtbox_builds.belongsTo(models.efiles, {
      foreignKey: 'efile_id'
    });
  };
  return mtbox_builds;
};
