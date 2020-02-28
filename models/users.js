'use strict';
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_name: {
            allowNull: true,
            unique: true,
            type: DataTypes.STRING
        },
        user_passwordhash: {
            allowNull: true,
            type: DataTypes.STRING
        },
        user_familyname: {
            allowNull: true,
            type: DataTypes.STRING
        },
        user_email: {
            allowNull: true,
            unique: true,
            type: DataTypes.STRING
        },
        user_phonenumber: {
            allowNull: true,
            type: DataTypes.STRING
        },
        user_address: {
            allowNull: true,
            type: DataTypes.STRING
        },
        user_city: {
            allowNull: true,
            type: DataTypes.STRING
        },
        user_status: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        group_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        profile_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        reset_password_token: {
            allowNull: true,
            type: DataTypes.STRING
        },
        active_account_token: {
            allowNull: true,
            type: DataTypes.STRING
        },
        client_id: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        permissions: Sequelize.VIRTUAL,
        active: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        rfid: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
    }, {
        tableName: 'users'
    });


    User.prototype.fields = [
        'user_id',
        'user_name',
        'user_familyname',
        'user_email',
        'user_phonenumber',
        'user_address',
        'user_city',
        'user_passwordhash',
        'user_status',
        'group_id',
        'profile_id',
        'reset_password_token',
        'active_account_token',
        'client_id',
        'active',
        'rfid',
        'name'
    ];
    User.prototype.fieldsSearchMetas = [
        'user_name',
        'user_familyname',
        'user_email',
        'user_phonenumber',
        'user_address',
        'user_city',
        'rfid',
        'name'
    ];

    User.prototype.setPassword_hash = function (password) {
        console.log("set password");
        var salt = bcrypt.genSaltSync();
        this.user_passwordhash = bcrypt.hashSync(password, salt);
        console.log("salt " + salt);
        console.log("user_passwordhash:" + this.user_passwordhash);
    };
    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.user_passwordhash;
        // delete values.reset_password_token;

        return values;
    };
    User.prototype.verifyPassword = function (password) {
        return bcrypt.compareSync(password, this.user_passwordhash);
    };

    User.prototype.verifyResetPasswordToken = function (reset_password_token) {
        return bcrypt.compareSync(reset_password_token, this.reset_password_token);
    };

    User.prototype.setResetPasswordToken = function (reset_password_token) {

        var salt = bcrypt.genSaltSync();
        this.reset_password_token = bcrypt.hashSync(reset_password_token, salt);
    };
    User.associate = function (models) {
        User.belongsTo(models.profiles, {
            foreignKey: 'profile_id'
        }); // Will add Profile_id to user
        User.belongsTo(models.groups, {
            foreignKey: 'group_id'
        }); // Will add Group_id to user
        User.belongsTo(models.clients, {
            foreignKey: 'client_id'
        }); // Will add client_id to user
    };
    return User;
};
