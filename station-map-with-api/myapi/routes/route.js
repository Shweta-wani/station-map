var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   if (req.query.id) {
//     let dataArray = require('../public/services/route.json');
//     dataArray = dataArray.filter(i => parseInt(i.id) === parseInt(req.query.id)).find(s => s.stations);
//     res.json({ stations: dataArray.stations });
//   }
// });

/* GET users listing. */
router.get('/', function (req, res, next) {
  let dataArray = require('../public/services/route.json');
  dataArray = dataArray.filter(i => parseInt(i.id) === parseInt(req.query.id)).find(s => s.stations);

  if (req.query.way_point) {
    res.json({ way_points: dataArray.way_point });
  }
  else if (req.query.id) {
    res.json({ stations: dataArray.stations });
  }
});




module.exports = router;
