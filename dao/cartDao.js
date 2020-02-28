const {baseModelDao} = require('./baseModalDao');
var sequelize = require('sequelize');
const Op = sequelize.Op;
let db = require('../models');

class CartDao extends baseModelDao {
    constructor() {
        super('carts', 'cart_id');
        this.baseModal = 'carts';
        this.primaryKey = 'cart_id';
    }

    allRFIDCards(req, res, next) {
        let _this = this
        var rfidData = []
        let i = 0
        return new Promise(function (resolve, reject) {
            let sqlBundle = "select distinct(rfid_cart) from carts where rfid_cart <> 'undefined'";
            _this.db.sequelize.query(sqlBundle,
                {type: db.sequelize.QueryTypes.SELECT})
                .then(rfidCards => {
                    rfidCards.forEach(rfid => {

                        rfidData.push(rfid.rfid_cart.substr(0, 10))
                        if (i === rfidCards.length - 1) {


                            res.send({
                                data: rfidData,
                                success: true,
                                lengthrdif: rfidData.length
                            })

                            resolve(rfid);
                        }
                        i++;
                    })
                });
        })
    }







}

module.exports = CartDao;
