var createError = require('http-errors');
var express = require('express');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog'); //Import routes for "catalog" area of site

//adicionamos o método COMPRESSION
var compression = require('compression');
//adicionamos o helmet para proteção HTTP headers 
var helmet = require('helmet');

// a usar em PRD
//process.env.NODE_ENV = 'production';

// Criação da app
var app = express();

//usar o Helmet
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views')); // indicação do folder aonde se encontra o view engine
app.set('view engine', 'pug'); // indicação do view engine, neste caso o 'pug'  

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//a usar o médtodo COMPRESSION
/*
Nota:
For a high - traffic website in production you wouldn 't use this middleware. Instead you would use a reverse proxy like Nginx.
*/
app.use(compression()); //Compress all routes
/* ------ */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.



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
