var express = require('express'),
  app = express(),
  port = process.env.PORT,
  User = require('./api/models/userModel'),
  Todo = require('./api/models/todoModel'),
  bodyParser = require('body-parser'),
  mongoose = require ("mongoose");
    // Here we find an appropriate database to connect to, defaulting to
    // localhost if we don't find one.
    var uristring =process.env.MONGODB_URI;


    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});

var middleware = require('./api/middleware/authmiddleware'); 
var routes = require('./api/routes/todoRoutes');
routes(app, middleware);
var user_routes = require('./api/routes/userRoutes');
user_routes(app, middleware);

app.listen(port);


console.log('Todo REST API server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});    