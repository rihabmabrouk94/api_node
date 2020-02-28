//var db = require('../models');
const Countries = require('../dao/countryDao');

/*var find_all = function (req, res, next) {
    db.countries.findAll().then(countries => {
      res.json(countries);
    });
  
  }*/
var countriesInst = new Countries();

module.exports = {
    //find_all:find_all,
    get: function (req, res, next) {
        countriesInst.find(req, res, next);
    },
};