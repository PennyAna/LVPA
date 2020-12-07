var express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 5000
var flash = require('connect-flash');
var passport = require('passport');
var request = require('request');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/')));
app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(__dirname + '/public'));
app.use(flash());
app.use(session({secret: 'keyboard cat'}))
app.use(bodyParser());

require('./routes.js') (app);