var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const cors = require('cors');

//!!!!!!!!!!!!Separated Routes for each Resource
var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); //added
//const sellersRouter = require('./routes/sellers'); //added
const cleanersRouter = require('./routes/cleaners'); //added
//const twilioRouter = require('./routes/twilio'); //added


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//!!!!!!!!!!!!!Mount all resource routes
app.use('/', indexRouter);
app.use('/users', usersRouter(dbHelpers));
//app.use('/sellers', sellersRouter(dbHelpers));
app.use('/cleaners', cleanersRouter(dbHelpers));
//app.use('/twilio', twilioRouter())

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
