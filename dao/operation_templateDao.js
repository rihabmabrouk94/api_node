const {baseModelDao} = require('./baseModalDao');

class OperationTemplateDao extends baseModelDao {
    constructor() {
        super('operation_templates', 'operation_template_id');
        this.baseModal = 'operation_templates';
        this.primaryKey = 'operation_template_id';
    }


    getOperationsTemplate(req, res, next) {
        let _this = this
        let article_id = req.body.article_id
        let lines = req.body.lines
        let promises = []
        var operations = []
        return new Promise(function(resolve, reject) {

            if (lines) {
                lines.forEach(line_id => {


                    promises.push(new Promise(function(resolve, reject) {
                        let sqlBundle = 'select * from machines machine\n' +
                            'where machine.line_id = '+ line_id + 'and machine.active=\'Y\''

                        _this.db.sequelize.query(sqlBundle, {
                            type: _this.db.sequelize.QueryTypes.SELECT
                        }).then(machines => {

                            if (machines) {
                                console.log('machines', machines)
                                _this.fn(line_id, machines, operations).then(op =>  {
                                    resolve(operations)
                                })
                            }


                        })
                    }))
                })
            }
            Promise.all([promises]).then(operations => {
                res.send({
                    data: operations
                })
            })

        })
    }


    fn(line_id, machines, operationTemplates) {
        let promises = []
        let _this = this
       return new Promise(function(resolve, reject) {
           machines.forEach(machine=>  {
               promises.push(new Promise(function(resolve, reject) {
                   let sqlBundle = 'SELECT op.*\n' +
                       'FROM machine_operation_templates mo\n' +
                       'left join operation_templates op on op.operation_template_id = mo.operation_template_id\n' +
                       'where mo.active = \'Y\' and mo.machine_id = '+ machine.machine_id

                   _this.db.sequelize.query(sqlBundle, {
                       type: _this.db.sequelize.QueryTypes.SELECT
                   }).then(operations => {

                       if (operations) {

                           var promise1 = new Promise(function(resolve, reject) {
                               let i = 0
                               operations.forEach( operation => {
                                   operationTemplates.push(operation)
                                   if (i=== operations.length -1) {
                                       resolve(operationTemplates)
                                   }
                                   i++
                               })
                           })

                           Promise.all([promise1]).then(function (op ) {
                               console.log('finished')
                               resolve(operationTemplates)
                           })

                       } else {

                           let sql = 'select op.* \n' +
                               'from machines machine\n' +
                               'left join operation_templates op on op.machine_type_id = machine.machine_type_id\n' +
                               'where machine.machine_id = ' + machine.machine_id

                           _this.db.sequelize.query(sqlBundle, {
                               type: _this.db.sequelize.QueryTypes.SELECT
                           }).then(operations => {
                               var promise1 = new Promise(function(resolve, reject) {
                                   let i = 0
                                   operations.forEach( operation => {
                                       operationTemplates.push(operation)
                                       if (i=== operations.length -1) {
                                           resolve(operationTemplates)
                                       }
                                       i++
                                   })
                               })

                               Promise.all([promise1]).then(function (op ) {
                                   resolve(operationTemplates)
                               })
                           })
                       }
                   })
               }))
           })
        })
    }
}

module.exports = OperationTemplateDao;
