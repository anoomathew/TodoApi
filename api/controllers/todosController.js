'use strict';

var mongoose = require('mongoose'),
  Todo = mongoose.model('Todos');

exports.get_todos = function(req, res) {
  Todo.find({}, function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json(Todo);
  });
};




exports.create_todo = function(req, res) {
  var new_Todo = new Todo(req.body);
  new_Todo.save(function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json(Todo);
  });
};


exports.get_todo = function(req, res) {
  Todo.findById(req.params.TodoId, function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json(Todo);
  });
};


exports.update_todo = function(req, res) {
  Todo.findOneAndUpdate(req.params.TodoId, req.body, {new: true}, function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json({ message: 'Todo successfully updated' });
  });
};


exports.delete_todo = function(req, res) {


  Todo.remove({
    _id: req.params.TodoId
  }, function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json({ message: 'Todo successfully deleted' });
  });
};
