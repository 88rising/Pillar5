require('dotenv').config({ silent: true });
import express = require('express');
import mongoose = require('mongoose');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
let passport = require('passport');
const app = express();

//Set up cors header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "null");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require("./models/userModel");
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

//Database connection
mongoose.connect('mongodb://localhost/pillar5');

let db = mongoose.connection;

db.on('error', console.error.bind('connection error'));
db.once('open', () => {
  console.log('wubbalubbadubdub');
})

app.use(express.static('./ngApp'));
app.use('/scripts', express.static('bower_components'));

app.use('/api/users', require('./routes/userRoute'));
app.use('/api/posts', require('./routes/postRoute'));
app.use('/api/discover', require('./routes/discoverRoute'));


app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers
app.use(function(err: any, req, res, next) {
  res.status(err.status || 500);
  // Don't leak stack trace if not in development
  let error = (app.get('env') === 'development') ? err : {};
  res.send({
    message: err.message,
    error: error
  });
});

export = app;
