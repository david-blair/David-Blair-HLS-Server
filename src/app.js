
// var createError = require('http-errors');
var express = require('express');

// var winston = require('./logging/winston');

var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors');
const fileUpload = require('express-fileupload');


require("dotenv").config();

var app = express();

app.use(
  cors({
    credentials: true,
    methods:['GET','POST'],
    origin: process.env.Session_Origin 
  })
);



var HLSRouter = require('./HLS/hls.router');

// var server = require('./server');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(morgan('dev' , {stream: winston.stream} ));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', HLSRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


//   winston.error(` ${err.timestamp} - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
