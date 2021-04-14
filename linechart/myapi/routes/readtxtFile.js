var express = require('express');
var router = express.Router();
var fs = require('fs');
var app = express();
var urlencoderParser = app.use(express.urlencoded({ extended: false }));

router.post('/', urlencoderParser, function (req, res, next) {
    const stationId = path(req.body.stationsId, 5);
    fs.readdir('./public/txtFiles', (err, filenames) => {
        if (err) throw err;

        const textFile = filenames.filter(el => el.indexOf(stationId) > -1 ? el : null);

        fs.readFile(`./public/txtFiles/${textFile[0]}`, 'utf8', function (err, data) {
            if (err) return err;
            var cells = data.split('\n').map(el => el.split(';'));
            cells.pop();
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
});


function path(num, size) {
    stationId = num.toString();
    while (stationId.length < size) stationId = "0" + stationId;
    return stationId;
}

module.exports = router;