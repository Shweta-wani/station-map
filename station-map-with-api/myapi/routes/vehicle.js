var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let dataArray = require('../public/services/vehicle.json');
  res.json({vehicle : dataArray});
});

module.exports = router;