var express = require('express');
var um = require('./lib/userManagement.js');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



app.get('/register', function (request, response) {
	response.render('register');
});


app.post('/addUser', function (request, response) {
  um.handleAddUser(request, response);
});

app.get('/login', function (request, response) {
  response.render('login');
});

app.get('/logout' , function ( request , response ) {
  um.logUserOut(request.cookies , response );
});

app.post('/authUser', function (request, response) {
  um.handleLogin(request, response);
});

app.get('/home', function (request, response) {
  var content = "<html><head></head><body><h1>Home</h1></body></html>";
  um.authenticateUser(request.cookies, response, content);
});

app.get('/newProduct' , function (request , response ){
  var content = 'newProduct';
  um.authenticateUser(request.cookies, response, content);
});

var server = app.listen(3000, function () {
  console.log('Starting eCommIt! ');
    });
