'use strict';
module.exports = (sequelize, DataTypes) => {
  const import_logs = sequelize.define('import_logs', {
    import_log_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    article: {
      allowNull: true,
      type: DataTypes.STRING
    },
    ordre: {
      allowNull: true,
      type: DataTypes.STRING
    },
    bundle: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status_import: {
      allowNull: true,
      type: DataTypes.STRING
    },
    date_start: {
      allowNull: true,
      type: DataTypes.STRING
    },
    date_end: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status_print: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    nb_carts: {
      allowNull: true,
      type: DataTypes.STRING
    },
    bundle_imp: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    codebundle: {
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
    tableName: 'import_logs'
  });
  import_logs.prototype.fields = [
    'import_log_id',
    'article',
    'ordre',
    'bundle',
    'status_import',
    'date_start',
    'date_end',
    'status_print',
    'nb_carts',
    'bundle_imp',
    'codebundle',
    'active'
  ];
  import_logs.prototype.fieldsSearchMetas = [
    'article',
    'ordre',
    'bundle',
    'status_import',
    'date_start',
    'date_end',
    'status_print',
    'nb_carts',
    'bundle_imp',
    'codebundle',
    'active'
  ];
  import_logs.associate = function(models) {
    // associations can be defined here
  };
  return import_logs;
};
