'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todosController');


  // todoList Routes
  app.route('/todo')
    .get(todoList.get_todos)
    .post(todoList.create_todo);


  app.route('/todo/:todoId')
    .get(todoList.get_todo)
    .put(todoList.update_todo)
    .delete(todoList.delete_todo);
};
