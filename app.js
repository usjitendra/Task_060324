const http = require('http')
const fs = require('fs')
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');

const cookieSession = require('cookie-session');
const  bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Mongoose = require('mongoose');

var Config = require('./config');


console.log(Config.get('mongo'))


 /******** Database connection configuration  ********/ 
  Mongoose.connect(Config.get('mongo').url, Config.get('mongo').options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
 /******** Database connection configuration  ********/



var indexRouter = require('./controller');
const app = express();

app.use(logger('dev'));
app.use(cors());

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use('/', indexRouter);



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Helmet for hearder protection.
// Data Sanitization against XSS attacks
app.use(xss());
// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
app.use(cookieSession({
    name: 'session',
    keys: ["testaccount"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(fileUpload());

app.use(helmet.xssFilter());
app.use(
    helmet.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    })
);


//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
// nunjucks.configure('webAccess/views', {
//   autoescape: false,
//   express   : app,
//   watch: true
// });
// app.set('view engine', 'html');




app.use(express.static(path.join(__dirname, 'dist')));

module.exports = app;
