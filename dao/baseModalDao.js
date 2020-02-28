class baseModelDao {

    constructor(baseModelDao, primaryKey) {
        this.db = require('../models');
        this.baseModal = baseModelDao;
        this.primaryKey = primaryKey;
        this.baseModal = null;
    }

    findById(req, res, next) {

        let params = req.params.params;

        this.db[this.baseModal].findById(params)
            .then(result => {

                    var whereQuery = {};
                    whereQuery[this.primaryKey] = result[this.primaryKey];
                    let includesQuery = [];
                    if ( result.getModelIncludes && result.getModelIncludes()) {
                        result.getModelIncludes().forEach(icludeItem => {
                            if (this.db[icludeItem]) {
                                includesQuery.push({
                                    model: this.db[icludeItem],
                                    required: false,
                                    where: {
                                        active: 'Y'
                                    }
                                });
                            }
                        })
                    }
                    this.db[this.baseModal].find({
                        where: whereQuery,
                        include: includesQuery
                    }).then(resFind => {
                        res.json({
                            message: 'success',
                            data: resFind,
                            status: 1,
                        })
                    })
            }).catch(err =>
                res.status(500).json(err)
            )
    }

    findByEncodeId(req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        var _id = params.id;


        var whereQuery = {};
        whereQuery[this.primaryKey] = _id;
        this.db[this.baseModal].findOne(whereQuery)
            .then(result => {
                var whereQuery = {};
                whereQuery[this.primaryKey] = _id;

                let includesQuery = [];
                if ( result.getModelIncludes && result.getModelIncludes()) {


                    result.getModelIncludes().forEach(icludeItem => {
                        if (this.db[icludeItem]) {
                            includesQuery.push({
                                model: this.db[icludeItem],
                                required: false,
                                where: {
                                    active: 'Y'
                                }
                            });
                        }
                    })
                }
                this.db[this.baseModal].find({
                    where: whereQuery,
                    include: includesQuery
                }).then(resFind => {

                    res.json({
                        message: 'success',
                        data: resFind, status: 1,
                    })
                })
            }).catch(err =>
            res.status(500).json(err)
        )
    }

    save(req, res, next) {

        var modalObj = this.db[this.baseModal].build(req.body);

        modalObj.save()
            .then(result => {
                var whereQuery = {};
                whereQuery[this.primaryKey] = result[this.primaryKey];

                var includeQuery = (this.baseModal.modelIncludes && this.baseModal.modelIncludes.length) ? (this.baseModal.modelIncludes && this.baseModal.modelIncludes.length) : [];

                let includesQuery = [];
                if ( result.getModelIncludes && result.getModelIncludes()) {
                    result.getModelIncludes().forEach(icludeItem => {
                        if (this.db[icludeItem]) {
                            includesQuery.push({
                                model: this.db[icludeItem],
                                required: false,
                                where: {
                                    active: 'Y'
                                }
                            });
                        }
                    })
                }

                this.db[this.baseModal].find({
                    where: whereQuery,
                    include: includesQuery
                }).then(resFind => {
                    res.json({
                        test: this.baseModal.modelIncludes,
                        message: 'success',
                        data: resFind, status: 1,
                        includesQuery: includesQuery
                    })
                })
            })
            .catch(err =>
                res.status(500).json(err)
            )
    }

    delete(req, res, next) {

        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        var _id = params.id;

        var whereQuery = {};
        whereQuery[this.primaryKey] = _id;
        var fields_to_update = {
            'active': 'N'
        };

        this.db[this.baseModal].update(fields_to_update,
            {where: whereQuery}
        ).then(result => {
            if(result) {
                res.json({
                    success: true,
                    messages:'deleted'
                })
            } else {
                res.json({
                    success: false,
                    messages:'Cant delete'
                })
            }
        }).catch(err =>
                res.status(500).json(err)
            )

        // this.db[this.baseModal].destroy(
        //     {where: whereQuery}).then(result =>
        //         res.json(result))
        //     .catch(err =>
        //         res.status(500).json(err)
        //     )
    }

    update(req, res, next) {
        var _id = req.body[this.primaryKey];
        var fields_to_update = {};

        var dataRequest = req.body;
        this.alterGetDataRequestToUpdate(dataRequest);

        var modalObj = this.db[this.baseModal].build();
        modalObj.fields.forEach(field => {

            console.log('field', field)
            if ((typeof dataRequest[field]) !== 'undefined' && field !== this.primaryKey) {
                if (dataRequest[field] === "") {
                    dataRequest[field] = null;
                }
                fields_to_update[field] = dataRequest[field];
            }
        });
        this.alterModelFieldsToUpdate(modalObj.fields);

        var whereQuery = {};
        whereQuery[this.primaryKey] = _id;

        this.db[this.baseModal].update(fields_to_update,
            {where: whereQuery}
        ).then(result => {
            this.afterUpdateModel(result)
            res.json(result)
        })
        .catch(err =>
            res.status(500).json(err)
        )
    }

    updateObject(req, res, next) {
        var _id = req.body[this.primaryKey];
        var fields_to_update = {};

        var dataRequest = req.body;

        this.alterGetDataRequestToUpdate(dataRequest);

        var modalObj = this.db[this.baseModal].build();
        modalObj.fields.forEach(field => {
            if ((typeof dataRequest[field]) !== 'undefined' && field !== this.primaryKey) {
                if (dataRequest[field] === "") {
                    dataRequest[field] = null;
                }
                fields_to_update[field] = dataRequest[field];
            }
        });

        console.log('fields_to_update', fields_to_update)
        this.alterModelFieldsToUpdate(modalObj.fields);

        var whereQuery = {};
        whereQuery[this.primaryKey] = _id;

        this.db[this.baseModal].update(fields_to_update,
            {where: whereQuery}
        ).then(r => {

            // console.log('resulllllt', result)
            // this.afterUpdateModel(result)


            this.db[this.baseModal].findOne({
                where: whereQuery
            }).then(result1 => {

                var includeQuery = (this.baseModal.modelIncludes && this.baseModal.modelIncludes.length) ? (this.baseModal.modelIncludes && this.baseModal.modelIncludes.length) : [];

                let includesQuery = [];
                if ( result1.getModelIncludes && result1.getModelIncludes()) {
                    result1.getModelIncludes().forEach(icludeItem => {
                        if (this.db[icludeItem]) {
                            includesQuery.push({
                                model: this.db[icludeItem],
                                required: false,
                                where: {
                                    active: 'Y'
                                }
                            });
                        }
                    })
                }

                this.db[this.baseModal].find({
                    where: whereQuery,
                    include: includesQuery
                }).then(resFind => {
                    res.json({
                        test: this.baseModal.modelIncludes,
                        message: 'success',
                        data: resFind, status: 1,
                        includesQuery: includesQuery
                    })
                })

            })

            // res.json(result)
        })
            .catch(err =>
                res.status(500).json(err)
            )
    }

    alterGetDataRequestToUpdate(dataRequest) {

    }

    alterModelFieldsToUpdate(fields) {

    }

    afterUpdateModel(result) {

    }

    find(req, res, next) {

        var dataRequest = req.body;
        var modalObj = this.db[this.baseModal].build();

        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        const defaultParams = {
            limit: 20,
            filter: [],
            offset: 0,
            sortBy: this.primaryKey,
            sortDir: 'ASC'
        };

        params = {
            ...defaultParams,
            ...params,
        };

        var query = {};

        if (params.limit >= 1) {
            query.limit = params.limit;
        }

        if (params.offset >= 0) {
            query.offset = params.offset;
        }


        if (params.sortBy) {
            query.order = [
                [params.sortBy, params.sortDir]
            ];
        }


        const Sequelize = require('sequelize');
        const Op = Sequelize.Op;

        let whereQuerySearchMeta = {
            operator: 'and',
            conditions: []
        };

        let whereQuery = {};
        let whereQueryFilters = {};
        if (params.filter) {
            params.filter.forEach(filterItem => {

                if (filterItem.operator && filterItem.conditions && filterItem.conditions.length) {
                    let conditionsCollection = [];
                    filterItem.conditions.forEach(conditionItem => {
                        conditionItem.value = decodeURIComponent(conditionItem.value)
                        if (conditionItem.field && conditionItem.operator.toUpperCase().replace(' ', '_') === 'IS_NULL') {
                            conditionItem.value = null
                        }
                        if (conditionItem.field && conditionItem.operator && (typeof conditionItem.value !== 'undefined')) {

                            let fieldItemCondition = {};
                            let fieldItemConditionData = {};
                            if (conditionItem.operator.toUpperCase().replace(' ', '_') === 'IS_NULL') {
                                fieldItemConditionData[Op.eq] = null;
                            } else  {
                                fieldItemConditionData[Op [conditionItem.operator]] = conditionItem.value;
                            }
                            fieldItemCondition[conditionItem.field] = fieldItemConditionData;
                            conditionsCollection.push(fieldItemCondition);
                        } else if (conditionItem.operator && conditionItem.conditions) {
                            let groupItemCondition = {};
                            groupItemCondition[Op [conditionItem.operator]] = [];
                            conditionItem.conditions.forEach(subConditionItem => {
                                let subFieldItemCondition = {};
                                let subbFieldItemConditionData = {};
                                subbFieldItemConditionData[Op [subConditionItem.operator]] = subConditionItem.value;
                                subFieldItemCondition[subConditionItem.field] = subbFieldItemConditionData;
                                groupItemCondition[Op [conditionItem.operator]].push(subFieldItemCondition);
                            });

                            conditionsCollection.push(groupItemCondinion);
                        }

                    });
                    whereQueryFilters[Op [filterItem.operator]] = conditionsCollection;

                }
            });
        }


        if (whereQueryFilters) {

            let defaultOperator = (params && params.filter && params.filter.length && typeof params.filter[0].operator !== "undefined") ? params.filter[0].operator : 'and';
            whereQuery[Op [defaultOperator]] = [whereQueryFilters];
        }


        if (params.meta_key && params.meta_key.length >= 3 && modalObj.fieldsSearchMetas) {
            let subConditions = [];
            modalObj.fieldsSearchMetas.forEach(field_name => {

                console.log('field_name', field_name)
                subConditions.push(Sequelize.where(Sequelize.fn("concat", Sequelize.col(field_name)), {ilike: "%" + params.meta_key + "%"}));
            });

            let whereQueryMetaKety = {
                [Op.or]: subConditions
            };
            if (whereQuery && whereQuery[Op ['and']]) {
                whereQuery[Op ['and']].push(whereQueryMetaKety);
            } else if (whereQuery && whereQuery[Op ['or']]) {
                whereQuery[Op ['or']].push(whereQueryMetaKety);
            } else {
                whereQuery[Op ['and']] = [whereQueryMetaKety];
            }


        }



        if (whereQuery) {
            query.where = [whereQuery];
        }

        if (modalObj && typeof modalObj.rawAttributes.active !== "undefined" && query.where) {
            query.where.push({
                [Op.and]: {
                    'active': 'Y'
                }
            })
        }


        let includesQuery = [];
        if (params.includes) {
            params.includes.forEach(icludeItem => {
                if (this.db[icludeItem]) {
                    includesQuery.push({
                        model: this.db[icludeItem],
                        required: false,
                        where: {
                            active: 'Y'
                        }
                    });
                }
            })
        }

        if (includesQuery.length) {
            query.include = includesQuery;
        }

        let _ = require('lodash');
        let queryCountAll = _.cloneDeep(query);
        delete queryCountAll['limit']
        delete queryCountAll['offset']
        delete queryCountAll['include']
        queryCountAll.where = query.where;
        queryCountAll.include = query.include;

        this.db[this.baseModal].count(queryCountAll).then((countAll) => {

            var pages = Math.ceil(countAll / params.limit);
            if (params.page) {
                query.page = Math.ceil(countAll / params.limit);
                query.offset = params.limit * (params.page - 1)
            }

            this.db[this.baseModal].findAll(query).then((data) => {

                const attributes_res = {
                    'count': countAll,
                    'whereQuerySearchMeta': whereQuerySearchMeta,
                    "filter": params.filter,
                    'offset': query.offset,
                    'limit': query.limit,
                    'pages': pages
                };

                this.alterGetDataFind(data, res, attributes_res);

            })
                .catch(error => {
                    res.status(500).json(error);
                });
        });
    }



    alterGetDataFind (data, res, attributes_res) {
        res.status(200).json({
            'data': data,
            'attributes': attributes_res
        })
    }



    find_promise(req, res, next) {

        let _this = this
        return new Promise(function(resolve, reject) {
            var dataRequest = req.body;
            var modalObj = _this.db[_this.baseModal].build();

            let params = req.params.params;
            params = (params && params.length) ? JSON.parse(params) : {};

            const defaultParams = {
                limit: 20,
                filter: [],
                offset: 0,
                sortBy: _this.primaryKey,
                sortDir: 'ASC'
            };

            params = {
                ...defaultParams,
                ...params,
            };

            var query = {};

            if (params.limit >= 1) {
                query.limit = params.limit;
            }

            if (params.offset >= 0) {
                query.offset = params.offset;
            }


            if (params.sortBy) {
                query.order = [
                    [params.sortBy, params.sortDir]
                ];
            }


            const Sequelize = require('sequelize');
            const Op = Sequelize.Op;

            let whereQuerySearchMeta = {
                operator: 'and',
                conditions: []
            };

            let whereQuery = {};
            let whereQueryFilters = {};
            if (params.filter) {
                params.filter.forEach(filterItem => {

                    if (filterItem.operator && filterItem.conditions && filterItem.conditions.length) {
                        let conditionsCollection = [];
                        filterItem.conditions.forEach(conditionItem => {
                            conditionItem.value = decodeURIComponent(conditionItem.value)
                            if (conditionItem.field && conditionItem.operator.toUpperCase().replace(' ', '_') === 'IS_NULL') {
                                conditionItem.value = null
                            }
                            if (conditionItem.field && conditionItem.operator && (typeof conditionItem.value !== 'undefined')) {

                                let fieldItemCondition = {};
                                let fieldItemConditionData = {};
                                if (conditionItem.operator.toUpperCase().replace(' ', '_') === 'IS_NULL') {
                                    fieldItemConditionData[Op.eq] = null;
                                } else  {
                                    fieldItemConditionData[Op [conditionItem.operator]] = conditionItem.value;
                                }
                                fieldItemCondition[conditionItem.field] = fieldItemConditionData;
                                conditionsCollection.push(fieldItemCondition);
                            } else if (conditionItem.operator && conditionItem.conditions) {
                                let groupItemCondition = {};
                                groupItemCondition[Op [conditionItem.operator]] = [];
                                conditionItem.conditions.forEach(subConditionItem => {
                                    let subFieldItemCondition = {};
                                    let subbFieldItemConditionData = {};
                                    subbFieldItemConditionData[Op [subConditionItem.operator]] = subConditionItem.value;
                                    subFieldItemCondition[subConditionItem.field] = subbFieldItemConditionData;
                                    groupItemCondition[Op [conditionItem.operator]].push(subFieldItemCondition);
                                });

                                conditionsCollection.push(groupItemCondinion);
                            }

                        });
                        whereQueryFilters[Op [filterItem.operator]] = conditionsCollection;

                    }
                });
            }


            if (whereQueryFilters) {

                let defaultOperator = (params && params.filter && params.filter.length && typeof params.filter[0].operator !== "undefined") ? params.filter[0].operator : 'and';
                whereQuery[Op [defaultOperator]] = [whereQueryFilters];
            }


            if (params.meta_key && params.meta_key.length >= 3 && modalObj.fieldsSearchMetas) {
                let subConditions = [];
                modalObj.fieldsSearchMetas.forEach(field_name => {

                    console.log('field_name', field_name)
                    subConditions.push(Sequelize.where(Sequelize.fn("concat", Sequelize.col(field_name)), {ilike: "%" + params.meta_key + "%"}));
                });

                let whereQueryMetaKety = {
                    [Op.or]: subConditions
                };
                if (whereQuery && whereQuery[Op ['and']]) {
                    whereQuery[Op ['and']].push(whereQueryMetaKety);
                } else if (whereQuery && whereQuery[Op ['or']]) {
                    whereQuery[Op ['or']].push(whereQueryMetaKety);
                } else {
                    whereQuery[Op ['and']] = [whereQueryMetaKety];
                }


            }



            if (whereQuery) {
                query.where = [whereQuery];
            }

            if (modalObj && typeof modalObj.rawAttributes.active !== "undefined" && query.where) {
                query.where.push({
                    [Op.and]: {
                        'active': 'Y'
                    }
                })
            }


            let includesQuery = [];
            if (params.includes) {
                params.includes.forEach(icludeItem => {
                    if (_this.db[icludeItem]) {
                        includesQuery.push({
                            model: _this.db[icludeItem],
                            required: false,
                            where: {
                                active: 'Y'
                            }
                        });
                    }
                })
            }

            if (includesQuery.length) {
                query.include = includesQuery;
            }

            let _ = require('lodash');
            let queryCountAll = _.cloneDeep(query);
            delete queryCountAll['limit']
            delete queryCountAll['offset']
            delete queryCountAll['include']
            queryCountAll.where = query.where;
            queryCountAll.include = query.include;

            _this.db[_this.baseModal].count(queryCountAll).then((countAll) => {

                var pages = Math.ceil(countAll / params.limit);
                if (params.page) {
                    query.page = Math.ceil(countAll / params.limit);
                    query.offset = params.limit * (params.page - 1)
                }

                _this.db[_this.baseModal].findAll(query).then((data) => {

                    const attributes_res = {
                        'count': countAll,
                        'whereQuerySearchMeta': whereQuerySearchMeta,
                        "filter": params.filter,
                        'offset': query.offset,
                        'limit': query.limit,
                        'pages': pages
                    };


                    resolve( { 'data': data,
                        'attributes': attributes_res})
                  //  this.alterGetDataFind(data, res, attributes_res);

                })
                    .catch(error => {
                        resolve(error);
                    });
            });

        })


    }



}


module.exports = {
    baseModelDao
};
