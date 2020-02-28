const Users = require('../dao/userDao');

var usersInst = new Users();

var send_email = function (req, res, next) {
    usersInst.send_email(req, res, next);
};

var send_email_without_passport = function (req, res, next) {
    usersInst.send_email_without_passport(req, res, next);
};
var find_user_by_profile = function (req, res, next) {
    usersInst.find_user_by_profile(req, res, next);
};
var forgot_password = function (req, res, next) {
    usersInst.forgot_password(req, res, next);
};
var find_user_by_reset_password_token = function (req, res, next) {
    usersInst.find_user_by_reset_password_token(req, res, next);
};

var random_reset_password_token = function (req, res, next) {
    usersInst.random_reset_password_token(req, res, next);
};

var init_reset_password_token = function (req, res, next) {
    usersInst.init_reset_password_token(req, res, next);
};

var send_email_forgot_password = function (req, res, next) {
    usersInst.send_email_forgot_password(req, res, next);
};

var send_email_active_account = function (req, res, next) {
    usersInst.send_email_active_account(req, res, next);
};

var find_user_by_active_account_token = function (req, res, next) {
    usersInst.find_user_by_active_account_token(req, res, next);
};

var find_by_searchQuery = function (req, res, next) {
    usersInst.find_by_searchQuery(req, res, next);
};

var find_by_client = function (req, res, next) {
    usersInst.find_by_client(req, res, next)
};

var findUserById = function (req,res,next){
    usersInst.findUserById(req, res, next);
}

module.exports = {
    add: function (req, res, next) {
        usersInst.insert_user(req, res, next);
    },
    delete: function (req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        let db = require('../models');
        let async = require('async');
        let countModelsHasSite = 0;
        var modalArray = []
        async.each(db, function (dbModelItem, callback) {
            if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'users' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.user_id) {
                dbModelItem.count(
                    {
                        where: {
                            user_id: params.id,
                            active: 'Y'
                        }
                    }
                ).then(result => {
                    if (result > 0) {
                        countModelsHasSite++;
                        modalArray.push(dbModelItem.getTableName()+ ' ');
                    }
                    callback()
                });
            } else {
                callback()
            }
        }, function (err) {
            if (countModelsHasSite) {
                res.json({
                    success: false,
                    messages: 'Cant delete',
                    models: modalArray
                })
            } else {
                usersInst.delete(req, res, next);
            }
        });
    },
    update: function (req, res, next) {
        usersInst.update(req, res, next);
    },
    find_by_id: function (req, res, next) {
        usersInst.findById(req, res, next);
    },
    get: function (req, res, next) {
        usersInst.find(req, res, next);
    },
    update_etat: function (req, res, next) {
        usersInst.updateEtat(req, res, next);
    },
    send_email: send_email,
    send_email_without_passport: send_email_without_passport,
    find_user_by_profile: find_user_by_profile,
    forgot_password: forgot_password,
    find_user_by_reset_password_token: find_user_by_reset_password_token,
    random_reset_password_token: random_reset_password_token,
    send_email_forgot_password: send_email_forgot_password,
    init_reset_password_token: init_reset_password_token,
    send_email_active_account: send_email_active_account,
    find_user_by_active_account_token: find_user_by_active_account_token,
    find_by_searchQuery: find_by_searchQuery,
    find_by_client: find_by_client,
    findUserById : findUserById
};
