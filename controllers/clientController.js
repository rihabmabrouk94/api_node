// clients = require('../dao/clientDao');
const Clients = require('../dao/clientDao');

/*
var add = function(req,res,next)
{
    clients.add(req,res,next);
}

var update = function (req,res,next)
{
    clients
*ate(req,res,next);
}


var drop = function (req,res,next)
{
    clients.delete(req,res,next);
}

var find_all= function (req,res,next)
{
    console.lo
*g('hello');Clients
   console.lClients
*(res.getHeaClients
    //res.jsClients
*('hello');
    clients.Clients
*nd_all(req,res,next);
}

var find_all_page = function (req,res, next)
{
    clients.find_all_page(req,res,next);
}

var find_by_id= function (req,res,next)
{
    clients.find_by_id(req,res, next);
}
var options= function (req,res,next)
{
    clients.options(req,res,next);
}

*/
var clientsInst = new Clients();


var findtest = function (req, res, next) {
    var db = require('../models');

    db.clients.findAll({
        include: [{
            model: db.countries
        },
        ]
    })
        .then((data) => {
            res.status(200).json({
                'data': data
            });
        })
        .catch(error => {
            res.status(500).json(error);
        })
};

module.exports =
    {
        update: function (req, res, next) {
            clientsInst.update(req, res, next);
        },
        get: function (req, res, next) {
            clientsInst.find(req, res, next);
        },
        getById: function (req, res, next) {
            clientsInst.findById(req, res, next);
        },
        save: function (req, res, next) {
            clientsInst.save(req, res, next);
        },
        delete: function (req, res, next) {
            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            let db = require('../models');
            let async = require('async');
            let countModelsHasSite = 0;
            var modalArray = []
            async.each(db, function (dbModelItem, callback) {
                if (typeof dbModelItem.getTableName == "function" && dbModelItem.getTableName() !== 'clients' && dbModelItem.rawAttributes && dbModelItem.rawAttributes.client_id) {
                    dbModelItem.count(
                        {
                            where: {
                                client_id: params.id,
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
                    clientsInst.delete(req, res, next);
                }
            });
        },
        findtest: findtest
    };
