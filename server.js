var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Todo = require('./api/models/todoModel'),
  bodyParser = require('body-parser');
  var mongoose = require ("mongoose");
    // Here we find an appropriate database to connect to, defaulting to
    // localhost if we don't find one.
    var uristring =process.env.MONGODB_URI ||'mongodb://localhost/Todo';


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

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require('./api/routes/todoRoutes');
routes(app);


app.listen(port);


console.log('Todo REST API server started on: ' + port);
    