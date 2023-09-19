/**
 * Module dependencies.
 */

// mongoose setup
require('./db');

const express = require('express');
const http = require('http');
const path = require('path');
const engine = require('ejs-locals');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const static = require('serve-static');

const app = express();
const routes = require('./routes');

// All environments
app.set('port', process.env.PORT || 3001);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(routes.current_user);
app.get('/', routes.index);
app.post('/create', routes.create);
app.get('/destroy/:id', routes.destroy);
app.get('/edit/:id', routes.edit);
app.post('/update/:id', routes.update);

app.use(static(path.join(__dirname, 'public')));

// Development only
if (app.get('env') === 'development') {
  app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
