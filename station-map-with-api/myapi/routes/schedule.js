var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let dataArray = require('../public/services/schedule.json');
  if(req.query.stop_number){
    dataArray = dataArray.filter(s => s.stop_number === req.query.stop_number &&
                                    s.date === req.query.date &&
                                    s.schedule_time > req.query.time);
    res.json({departures : dataArray});
  }
});

/* router.get('/:stop_number', function(req, res, next) {
  let dataArray = require('../public/services/schedule.json');
  console.log(req.query);
 // dataArray = dataArray.find(s => s.stop_number === req.query.stop_number);
  //res.json({departures : dataArray});
  res.render(schedule);
}); */

module.exports = router;