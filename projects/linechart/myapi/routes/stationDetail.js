var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET the page. */
router.get('/', function (req, res, next) {
    const textFile = './public/txtFiles/station_detail.txt';

    fs.readdir('./public/txtFiles', (err, filenames) => {
        console.log(__dirname);
        if (err) throw err;

        let files = [];
        for (let i = 0; i < filenames.length; i++) {
            if (filenames[i].indexOf('produkt_klima_jahr') > -1) {
                files.push(parseInt(filenames[i].substr(filenames[i].length - 9).substring(0, 5)));

            }
        }

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
            let json = JSON.stringify(obj);

            res.send(json);
        })
    });
});

router.get('/files', function (req, res, next) {
   
    fs.readdir('./public/txtFiles', (err, filenames) => {
        if (err) throw err;

        let files = [];
        for (let i = 0; i < filenames.length; i++) {
            if (filenames[i].indexOf('produkt_klima_jahr') > -1) {
                files.push(parseInt(filenames[i].substr(filenames[i].length - 9).substring(0, 5)));
            }
        }
        res.send(files);
    });
});

module.exports = router;