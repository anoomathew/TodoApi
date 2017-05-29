var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  User = require('./api/models/userModel'),
  Todo = require('./api/models/todoModel'),
  bodyParser = require('body-parser'),
  mongoose = require ("mongoose");
    // Here we find an appropriate database to connect to, defaulting to
    // localhost if we don't find one.
    var uristring =process.env.MONGODB_URI ||'mongodb://heroku_1p2b1drt:7b777hdoe2qv51gii7q1mdpj4u@ds155961.mlab.com:55961/heroku_1p2b1drt';


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


var middleware = require('./api/middleware/authmiddleware'); 
var routes = require('./api/routes/todoRoutes');
routes(app, bodyParser, middleware);
var user_routes = require('./api/routes/userRoutes');
user_routes(app, bodyParser, middleware);

app.listen(port);


console.log('Todo REST API server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});    