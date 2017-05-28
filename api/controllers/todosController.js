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
    res.json({ message: 'New task successfully created' });
  });
};


exports.get_todo = function(req, res) {
  Todo.findById(req.params.todoId, function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json(Todo);
  });
};


exports.update_todo = function(req, res) {
  Todo.findOneAndUpdate(req.params.todoId, req.body, {new: true}, function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json({ message: 'Task successfully updated' });
  });
};


exports.delete_todo = function(req, res) {
  Todo.remove({
    _id: req.params.todoId
  }, function(err, Todo) {
    if (err)
      res.send({ message: err });
    res.json({ message: 'Task successfully deleted' });
  });
};
