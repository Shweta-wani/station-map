var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');

var indexRouter = require('./routes/index');
var stationRouter = require('./routes/stationtable');
var scheduleRouter = require('./routes/schedule');
var routeRouter = require('./routes/route');
var vehicleRouter = require('./routes/vehicle');
var txtFileRouter = require('./routes/readtxtFile');

var app = express();
app.use(cors({origin:'http://localhost:8080'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stationtable', stationRouter);
app.use('/schedule', scheduleRouter);
app.use('/route', routeRouter);
app.use('/vehicle', vehicleRouter);
app.use('/txtfile', txtFileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
