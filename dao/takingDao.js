const {baseModelDao} = require('./baseModalDao');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

class TakingDao extends baseModelDao {


    constructor() {
        super('takings', 'taking_id');
        this.baseModal = 'takings';
        this.primaryKey = 'taking_id';
    }

    ajouterPrelevement(req, res, next) {
        let params = req.body;
        let _this = this;

        let prelevements = [];
        if (params.production_product_id === null || params.production_product_id === '') {

            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'Product does not provided',
                        internalMessage: 'Product does not provided',
                        code: 12000
                    }
                ]
            });
            return;

        }

        _this.db['stock_production_products'].findAll({
            where: {
                production_product_id: params.production_product_id,
                active: 'Y'
            }
        }).then(stocksResult => {


            _this.totalQuantities(stocksResult).then(total_quantity => {



                if (total_quantity > 0 && total_quantity >= params.total_quantity) {


                    if (stocksResult.length === 0) {
                        resolve({
                            success: true,
                            data: []
                        });
                        return;
                    }
                    _this.order_bundle(params.code_order, params.code_bundle).then(data => {
                        params.bundle_id = data.bundle_id;
                        params.order_id = data.order_id;
                        _this.compareStockAndQuantity(params.total_quantity, stocksResult, params, prelevements).then(resultStock => {

                            res.send({
                                success: true,
                                data: resultStock.data
                            });
                            return;
                        })
                    })

                } else {

                    res.send({
                        success: false,
                        data: null,
                        messages: [
                            {
                                userMessage: 'Stocks are full',
                                internalMessage: 'Stocks are full',
                                code: 13000
                            }
                        ]
                    });
                    return;
                }
            })
            return;
        })
    }

    compareStockAndQuantity(total_quantites, stocks, prelevement, prelevements) {

        let _this = this;
        return new Promise(function (resolve, reject) {
            if (stocks.length === 0) {
                resolve([]);
                return;
            }
            var quantity = total_quantites;
            _this.processItemCalculQuantity(stocks, 0, quantity, prelevement, prelevements).then(finish => {
                resolve(finish);
                return;
            });
        });
    }

    processItemCalculQuantity(stocks, i, quantity, prelevement, prelevements) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.calculQuantity(stocks[i], quantity, prelevement, prelevements).then(dataResult => {

                i++;
                if (dataResult.quantity === 0 || i === stocks.length) {

                    resolve(dataResult);
                    return;
                } else {
                    return resolve(_this.processItemCalculQuantity(stocks, i, dataResult.quantity, prelevement, prelevements));
                }
            })
        })
    }

    annulerPrelevement(req, res, next) {

        let idPrelevement = req.query.id;
        let _this = this;

        _this.db['takings'].findOne({
            where: {
                taking_id: idPrelevement
            }
        }).then(prelevement => {

            if (prelevement) {

                _this.db['stock_production_products'].findOne({
                    where: {
                        stock_production_product_id: prelevement.stock_id,

                    }
                }).then(stock => {

                    let quantity_used = Number(stock.quantity_used) - Number(prelevement.total_quantity);
                    if (stock) {
                        _this.db['stock_production_products'].update(
                            {
                                quantity_used: Number(stock.quantity_used) - Number(prelevement.total_quantity),
                                quantity_available: Number(stock.quantity) - quantity_used
                            },
                            {
                                where: {
                                    stock_production_product_id: prelevement.stock_id
                                }
                            }).then(resultUpdate => {

                            _this.db['takings'].update(
                                {
                                    active: 'N'
                                },
                                {
                                    where: {
                                        taking_id: idPrelevement
                                    }
                                }).then(resultUpdate => {

                            })

                            res.send({
                                success: true
                            })
                        });
                    } else {
                        res.send({msg: 'stock does not exist'})
                    }

                });

            } else {
                res.send('taking id does not exist');
                return;
            }


        })

    }

    totalQuantities(stocks) {
        return new Promise(function (resolve, reject) {
            if (stocks.length === 0) {
                resolve(0);
                return;
            }
            let i = 0;
            let total_quantity = 0;

            stocks.forEach(function (stock) {
                if (stock.quantity) {
                    total_quantity = total_quantity + (stock.quantity - stock.quantity_used);
                    i++;
                }
                if (i === stocks.length) {

                    resolve(total_quantity);
                    return;
                }
            })
        })
    }

    calculQuantity(stock, quantity, prelevement, prelevements) {
        let _this = this;
        return new Promise(function (resolve, reject) {

            if (stock.quantity > stock.quantity_used) {
                let quantityStockRestante = stock.quantity - stock.quantity_used;
                if (quantityStockRestante > quantity) {
                    _this.db['stock_production_products'].update(
                        {
                            quantity_used: Number(stock.quantity_used) + Number(quantity),
                            quantity_available: Number(stock.quantity) - (Number(stock.quantity_used) + Number(quantity))
                        },
                        {
                            where: {
                                stock_production_product_id: stock.stock_production_product_id,
                            }
                        }).then(resultUpdate => {
                        _this.db['takings'].build({
                            note: prelevement.note,
                            date: new Date().toString(),
                            order_id: prelevement.order_id,
                            operation_id: prelevement.operation_id,
                            stock_id: stock.stock_production_product_id,
                            bundle_id: prelevement.bundle_id,
                            total_quantity: quantity
                        }).save().then(taking => {

                            _this.db['takings'].findOne({
                                where: {
                                    taking_id: taking.taking_id
                                },
                                required: false,
                                include: [
                                    {
                                        model: _this.db['orders']
                                    },
                                    {
                                        model: _this.db['operations']
                                    },
                                    {
                                        model: _this.db['bundles']
                                    },
                                    {
                                        model: _this.db['stock_production_products']
                                    }
                                ]
                            }).then(taking => {

                                if (taking) {
                                    prelevements.push(taking);
                                }

                                quantity = 0;

                                resolve(
                                    {
                                        quantity: quantity,
                                        data: prelevements
                                    });
                                return;
                            })


                        })
                    })
                } else {
                    _this.db['stock_production_products'].update(
                        {

                            quantity_used: Number(stock.quantity_used) + Number(quantityStockRestante),
                            quantity_available: Number(stock.quantity) - (Number(stock.quantity_used) + Number(quantityStockRestante))
                        },
                        {
                            where: {
                                stock_production_product_id: stock.stock_production_product_id,
                            }
                        }).then(resultUpdate => {

                        _this.db['takings'].build({
                            note: prelevement.note,
                            date: new Date().toString(),
                            order_id: prelevement.order_id,
                            operation_id: prelevement.operation_id,
                            stock_id: stock.stock_production_product_id,
                            bundle_id: prelevement.bundle_id,
                            total_quantity: stock.quantity_used + quantityStockRestante
                        }).save().then(taking => {

                            _this.db['takings'].findOne({
                                where: {
                                    taking_id: taking.taking_id
                                },
                                required: false,
                                include: [
                                    {
                                        model: _this.db['orders']
                                    },
                                    {
                                        model: _this.db['operations']
                                    },
                                    {
                                        model: _this.db['bundles']
                                    },
                                    {
                                        model: _this.db['stock_production_products']
                                    }
                                ]
                            }).then(taking => {

                                if (taking) {
                                    quantity = quantity - quantityStockRestante;

                                    prelevements.push(taking);


                                }

                                resolve(
                                    {
                                        quantity: quantity,
                                        data: prelevements
                                    });
                                return;
                            })
                        });

                    })
                }
            } else {
                resolve(quantity);
                return;
            }
        })
    }

    info(req, res, next) {
        let _this = this;
        let id = req.params.id;
        _this.db['takings'].findOne({
            where: {
                taking_id: id
            },
            required: false,
            include: [
                {
                    model: _this.db['orders']
                },
                {
                    model: _this.db['operations']
                },
                {
                    model: _this.db['bundles']
                },
                {
                    model: _this.db['stock_production_products'],
                    include: [
                        {
                            model: _this.db['production_products']
                        },
                        {
                            model: _this.db['production_product_providers']
                        }
                    ]
                }
            ]
        }).then(taking => {
            if (taking) {
                res.send({
                    data: taking,
                    success: true
                });
            } else {
                res.send({
                    data: taking,
                    success: false
                });
            }
        })
    }

    updateTaking(req, res, next) {
        let _this = this;
        let body = req.body;

        _this.order_bundle(body.code_order, body.code_bundle).then(data => {
            _this.db[this.baseModal].update(
                {
                    note : body.note,
                    bundle_id : data.bundle_id,
                    order_id: data.order_id
                },
                {
                    where:  {
                        taking_id:body.taking_id
                    }
                }
            ).then(result => {
                _this.db['takings'].findOne({
                    where : {
                        taking_id:body.taking_id
                    },
                    include : [
                        {
                            model : _this.db['orders']
                        },
                        {
                            model : _this.db['bundles']
                        }
                    ]
                }).then(taking => {
                    res.json({
                            data: taking
                        });
                })

            })
        })
    }

    order_bundle(code_order, code_bundle) {

        console.log('*******', code_order, code_bundle)
        let _this = this;
        return new Promise(function (resolve, reject) {

            _this.db['orders'].findOne({
                where: {
                    code: code_order
                }
            }).then(order => {

                let order_id = null;
                if (order) {
                    order_id = order.order_id
                }
                _this.db['bundles'].findOne({
                    where: {
                        code_bundle: code_bundle
                    }
                }).then(bundle => {

                    let bundle_id = null;
                    if (bundle) {
                        bundle_id = bundle.bundle_id
                    }

                    resolve({
                        bundle_id: bundle_id,
                        order_id: order_id
                    });
                    return;

                })
            })
        })

    }

}

module.exports = TakingDao;
