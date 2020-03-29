var createError = require('http-errors');
const mongoose = require('mongoose')
const uriUtil = require('mongodb-uri')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var bodyParser     =        require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var IDRouter = require('./routes/ID');

var app = express();

const uri = "mongodb+srv://Markos_Polo:aGitviSo3QyQ7Bw@winhacks-axqos.gcp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("MongoDB connection established"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ID', IDRouter);

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


