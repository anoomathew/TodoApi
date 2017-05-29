'use strict';
module.exports = function(app, middleware) {
  var todoList = require('../controllers/todosController');

  // todoList Routes
  app.route('/todos')
    .get(middleware.checkAuth,todoList.get_todos)
    .post(middleware.checkAuth,todoList.create_todo);


  app.route('/todos/:todoId')
    .get(middleware.checkAuth,todoList.get_todo)
    .put(middleware.checkAuth,todoList.update_todo)
    .delete(middleware.checkAuth,todoList.delete_todo);
};

