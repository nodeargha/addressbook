
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var contacts = require('./routes/contacts');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// Using the .html extension instead of
// having to name the views as *.ejs
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/',routes.signin);
app.get('/signup', user.signupform);
app.post('/signup',user.adduser);
app.get('/userhome', user.userhome);
app.get('/signout', user.signout);
app.get('/contacts', contacts.allcontacts);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Addressbook server listening on port ' + app.get('port'));
});
