var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('./authentication/auth-init')(passport);
var flash = require('connect-flash');
var session = require('express-session');
var util = require('util');
var users = require('./routes/users');
var boards = require('./routes/boards');
var home = require('./routes/home');
var cards = require('./routes/cards');
var dbURI = 'mongodb://localhost/Project_Trello';
var RedisStore = require('connect-redis')(session);
var app = express();

mongoose.connect(dbURI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'staticDesign')));
app.use(express.static(path.join(__dirname, 'public')));

/*Session related middlewares*/
// #to be uncommented
// app.use(session({
// store: new RedisStore({
//   host: '127.0.0.1',
//   port: 6379
// }),
// secret: 'blahhh'}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(flash());

/* Routes */

var routes = require('./routes/index')(app,passport);
app.use('/home', home)
app.use('/users', users);
app.use('/boards', boards);
app.use('/cards',cards);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;