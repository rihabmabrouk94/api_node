'use strict';
module.exports = (sequelize, DataTypes) => {
    const sequences = sequelize.define('sequences', {
        sequence_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        with_subsequences: {
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    }, {
        tableName: 'sequences'
    });

    sequences.prototype.fields = [
        'sequence_id',
        'stitchcount',
        'coupe_fil',
        'parent_sequence',
        'back_stitch',
        'sequence_order',
        'picture_id',
        'active',
        'operation_template_id',
        'back_stich_positive_tolerence',
        'back_stich_negative_tolerence',
        'stitchcount_positive_tolerence',
        'stitchcount_negative_tolerence',
        'with_subsequences',
        'description'
    ];

    sequences.prototype.fieldsSearchMetas = [
        'sequence_id',
        'stitchcount',
        'coupe_fil',
        'parent_sequence',
        'back_stitch',
        'sequence_order',
        'picture_id',
        'active',
        'operation_template_id',
        'back_stich_positive_tolerence',
        'back_stich_negative_tolerence',
        'stitchcount_positive_tolerence',
        'stitchcount_negative_tolerence',
        'with_subsequences',
        'description'

    ];

    const sequence = require('./sequences');
    const operation_templates = require('./operation_templates');

    sequences.prototype.modelIncludes = {
        'sequences': {
            model: sequence
        },
        'operation_templates': {
            model: operation_templates
        }
    }

    sequences.associate = function (models) {
        sequences.belongsTo(models.sequences, {
            foreignKey: 'parent_sequence'
        });

        sequences.belongsTo(models.operation_templates, {
            foreignKey: 'operation_template_id'
        });

    }

    return sequences;
};
