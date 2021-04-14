var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET the page. */
router.get('/', function (req, res, next) {
    const textFile = './public/txtFiles/station_detail.txt'
    fs.readFile(textFile, 'utf8', function (err, data) {
        if (err) throw err;

        var cells = data.split('\n').map(function (el) { return el.split(/\s+/); });
        var headings = cells.shift();
        var obj = cells.map(function (el) {
            var obj = {};
            for (var i = 0; i < el.length; i++) {
                obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
            }
            return obj;
        });
        var json = JSON.stringify(obj);
        res.send(json);
    })
});

module.exports = router;