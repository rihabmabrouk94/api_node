const {baseModelDao} = require('./baseModalDao');

class OrderDao extends baseModelDao {
    constructor() {
        super('orders', 'order_id');
        this.baseModal = 'orders';
        this.primaryKey = 'order_id';
    }

    deleteBundleOrder(req, res, next) {
        let _this = this;
        let order_id = req.params.order_id;
        _this.db['orders'].findOne({
            where: {
                order_id: order_id
            }
        })
            .then(order => {
                if (order) {
                    _this.db['orders'].update(
                        {
                            active: 'N'
                        },
                        {
                            where: {
                                order_id: order_id
                            }
                        }).then(result => {
                        if (result) {
                            _this.db['bundles'].findAll({
                                where: {
                                    order_id: order_id
                                }
                            })
                                .then(bundles => {
                                    if (bundles) {
                                        bundles.forEach(function (bundle) {
                                            _this.db['bundles'].update(
                                                {
                                                    active: 'N'
                                                },
                                                {
                                                    where: {
                                                        order_id: bundle.order_id
                                                    }
                                                }).then(result2 => {
                                            })
                                        })
                                        res.json({
                                            success: true,
                                            messages: 'deleted'
                                        })
                                    } else {
                                        res.json({
                                            success: false,
                                            messages: 'Cant delete'
                                        })
                                    }
                                })


                        } else {
                            res.json({
                                success: false,
                                messages: 'Cant delete'
                            })
                        }
                    });
                } else {
                    res.send(
                        {
                            "success": false,
                            "data": null,
                            "messages": [
                                {
                                    "userMessage": "Order not exists",
                                    "internalMessage": "Order not exists",
                                    "code": 11000
                                }
                            ],
                            "attributes": [],
                            "status": 500
                        }
                    );
                }

            })

    }


    // get_order_Info(req, res, next) {
    //     let order_id = req.params.order_id
    //     let db = require('../models');
    //
    //     let sql = 'SELECT (orders.quantity) as quantity_Total, orders.description , orders.code , orders.label ,clients.client_label, articles.label, SUM( p.quantity)as quantity , \n' +
    //         '((orders.quantity)-SUM( p.quantity)) as rest_quantity From \n'+
    //     '(SELECT (MIN(cpo.quantity)) as quantity, bundles.order_id  FROM cart_pending_operations as cpo \n'+
    //     'LEFT JOIN bundles ON bundles.bundle_id = cpo.bundle_id \n'+
    //      'WHERE bundles.order_id = \n'+ order_id + '\n'+
    //     'GROUP BY bundles.order_id ) as p \n'+
    //     'LEFT JOIN orders ON orders.order_id = p.order_id\n'+
    //     'LEFT JOIN articles ON articles.article_id = orders.article_id\n'+
    //    'LEFT JOIN clients ON clients.client_id = orders.client_id \n'+
    //     'GROUP BY orders.quantity,orders.description , orders.code,  orders.label ,clients.client_label,articles.label'
    //     this.db.sequelize.query(sql,
    //         {type: db.sequelize.QueryTypes.SELECT})
    //         .then(quantity => {
    //             res.send({data: quantity})
    //
    //         })
    //
    // }

    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    get_order_Info(req, res, next) {
        let orders = []
        let _this = this
        let db = require('../models');
        this.find_promise(req, res, next).then(orderss => {
            if(orderss &&  orderss.data.length){
            var promise1 = new Promise(function (resolve, reject) {

                let i = 0;
                orderss.data.forEach(orderItem => {
                    let sql = 'SELECT \n' +
                        '                         CASE WHEN (orders.quantity)IS NOT NULL THEN  (orders.quantity) else 0 END  as quantity_Total,\n' +
                        '                         orders.description , orders.code , orders.label ,clients.client_label,\n' +
                        '                         (articles.label) as article, SUM( quantity_order_item.quantity)as quantity ,\n' +
                        '                         CASE WHEN ((orders.quantity)-SUM( quantity_order_item.quantity))IS NOT NULL THEN  ((orders.quantity)-SUM( quantity_order_item.quantity)) else 0 END  as rest_quantity,\n' +
                        '                         orders.order_id,\n' +
                        '                         CASE WHEN (SUM( quantity_order_item.quantity)::double precision /  (orders.quantity) )*100  IS NOT NULL THEN\n' +
                        '                         (SUM( quantity_order_item.quantity)::double precision /  (orders.quantity) )*100 else 0 END  as progress\n' +
                        '                         From\n' +
                        '                         (SELECT (MIN(cpo.quantity)) as quantity, bundles.order_id  \n' +
                        '                         FROM cart_pending_operations as cpo\n' +
                        '                         LEFT JOIN bundles ON bundles.bundle_id = cpo.bundle_id\n' +
                        '                         WHERE bundles.order_id =\n' + orderItem.order_id + '\n' +
                        '                         GROUP BY bundles.order_id ) as quantity_order_item \n' +
                        '                         LEFT JOIN orders ON orders.order_id = quantity_order_item.order_id\n' +
                        '                         LEFT JOIN articles ON articles.article_id = orders.article_id\n' +
                        '                         LEFT JOIN clients ON clients.client_id = orders.client_id\n' +
                        '                         GROUP BY orders.order_id,orders.quantity,orders.description , orders.code,  orders.label ,clients.client_label,articles.label'
                    _this.db.sequelize.query(sql,
                        {type: db.sequelize.QueryTypes.SELECT})
                        .then(order => {
                            if (order && order.length > 0) {
                                orders.push(order[0])
                            } else {
                                _this.db['orders'].findById(orderItem.order_id, {
                                    include: [
                                        {
                                            model: _this.db['clients']
                                        },
                                        {
                                            model: _this.db['articles']
                                        }]

                                }).then(result => {
                                    let order_bundle = {
                                        quantity_total: result.quantity,
                                        description: result.description,
                                        code: result.code,
                                        label: result.label,
                                        client_label: result.client.client_label,
                                        article: result.article.label,
                                        quantity: "0",
                                        rest_quantity: "0"

                                    }
                                    orders.push(order_bundle)
                                    if (orders.length === orderss.data.length) {
                                        resolve(orders)
                                    }
                                    i++
                                })


                            }
                            if (orders.length === orderss.data.length) {
                                resolve(orders)
                            }
                            i++

                        })


                })
            })
            Promise.all([promise1]).then(function (ordres_res) {
                orders = orders.sort(_this.dynamicSort('label'))
                res.send({
                    data: orders,
                    success: true,
                    attributes: orderss.attributes
                })
            })

        } else{
                res.send({
                    data: [],
                    success: true,
                    attributes: orderss.attributes
                })
            }
        })


    }
    codeOrders(req, res, next) {
        let _this = this
        var promise1 = new Promise(function (resolve, reject) {
            let sql = 'select distinct(code) \n' +
                'from orders \n' +
                'where active = \'Y\' \n' +
                'order by code asc';
            _this.db.sequelize.query(sql, {
                type: _this.db.sequelize.QueryTypes.SELECT
            }).then(codebundles => {
                let data = []
                if (codebundles) {
                    codebundles.forEach(bundle => {
                        data.push(bundle.code)
                        if (data.length === codebundles.length) {
                            resolve(data)
                        }
                    })
                } else {
                    resolve([])
                }
            })
        })
        Promise.all([promise1]).then(function (dataResult) {
            res.send({data: dataResult[0]})
        })
    }
    get_bundles_info_by_order(req,res,next){
        let order_id= req.params.order_id
        let size = req.params.size
        let _this = this

        let db = require('../models');

                        let sql = 'SELECT \n' +
                            '                     CASE WHEN (bundles.bundle_qte)IS NOT NULL THEN  (bundles.bundle_qte) else 0 END  as quantity_Total,\n' +
                            '                     bundles.code_bundle , bundles.num_bundle , bundles.variant1 ,bundles.variant2, bundles.variant3, bundles.size1,bundles.size2,bundles.bundle_id ,  (MIN(cpo.quantity)) as quantity,\n' +
                            '                     CASE WHEN ((bundles.bundle_qte)-(MIN(cpo.quantity)))IS NOT NULL THEN \n' +
                            '                     ((bundles.bundle_qte)-(MIN(cpo.quantity)) ) else 0 END  as rest_quantity,\n' +
                            '                     CASE WHEN (MIN(cpo.quantity))::double precision / (bundles.bundle_qte)*100  IS NOT NULL\n' +
                            '                     THEN ((MIN(cpo.quantity))::double precision / (bundles.bundle_qte))*100 else 0 END  as progress         \n' +
                            '                     FROM bundles \n' +
                            '                     LEFT JOIN  cart_pending_operations as cpo ON cpo.bundle_id =  bundles.bundle_id \n' +
                            '                     WHERE bundles.order_id =' + order_id + 'AND bundles.size1=\'' + size + '\'' + '\n'+
                            '                     GROUP BY bundles.bundle_qte ,bundles.code_bundle , bundles.num_bundle , bundles.variant1 ,bundles.variant2, bundles.variant3, bundles.size1,bundles.size2,bundles.bundle_id'

                        _this.db.sequelize.query(sql,
                            {type: db.sequelize.QueryTypes.SELECT})
                            .then(bundle => {
                                 res.send({
                                     data: bundle,
                                     success: true
                                 })

                            })

    }
    get_order_info_by_size(req,res,next){
        let order_id= req.params.order_id
        let _this = this
        let db = require('../models');


        let sql = 'SELECT DISTINCT bundle.size, bundle.order_id, SUM(bundle.quantity_Total) as quantity_total , SUM(bundle.quantity)as quantity ,(SUM(bundle.quantity) / SUM(bundle.quantity_Total)) as progress \n' +
            'From\n' +
            '(SELECT \n' +
            '  CASE WHEN (bundles.bundle_qte)IS NOT NULL THEN  (bundles.bundle_qte) else 0 END  as quantity_Total,\n' +
            'bundles.code_bundle , bundles.num_bundle , bundles.variant1 ,bundles.variant2, bundles.variant3, bundles.size1 as size ,\n' +
            'bundles.size2,bundles.bundle_id ,  (MIN(cpo.quantity)) as quantity,bundles.order_id as order_id, \n' +
            'CASE WHEN ((bundles.bundle_qte)-(MIN(cpo.quantity)))IS NOT NULL THEN \n' +
            '((bundles.bundle_qte)-(MIN(cpo.quantity)) ) else 0 END  as rest_quantity,\n' +
            'CASE WHEN (MIN(cpo.quantity))::double precision / (bundles.bundle_qte)*100  IS NOT NULL\n' +
            ' THEN ((MIN(cpo.quantity))::double precision / (bundles.bundle_qte))*100 else 0 END  as progress         \n' +
            'FROM bundles \n' +
            ' LEFT JOIN  cart_pending_operations as cpo ON cpo.bundle_id =  bundles.bundle_id \n' +
            '\n' +
            'WHERE bundles.order_id = \n' +order_id+ '\n'+
            '       GROUP BY bundles.bundle_qte ,bundles.code_bundle , bundles.num_bundle , bundles.variant1 ,bundles.variant2, bundles.variant3, bundles.size1,bundles.size2,bundles.bundle_id) as bundle\n' +
            '       \n' +
            '        GROUP BY bundle.size, bundle.order_id '
        _this.db.sequelize.query(sql,
            {type: db.sequelize.QueryTypes.SELECT})
            .then(sizes => {
                res.send({
                    data: sizes,
                    success: true
                })
            })


    }

    findByCode(req, res, next) {

        let code = decodeURIComponent(req.query.code)
        let _this = this
        let sql = 'select distinct(o.*) \n' +
            'from orders o\n' +
            'where active = \'Y\' and code = \'' + code + '\''
        _this.db.sequelize.query(sql, {
            type: _this.db.sequelize.QueryTypes.SELECT
        }).then(order => {

            if (order && order[0]) {
                res.send({
                    data: order[0],
                    success: true
                })
            } else {
                res.send({
                    data: null,
                    success: false
                })
            }

        })
    }
}

module.exports = OrderDao;
