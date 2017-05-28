'use strict';
module.exports = function(app, bodyParser) {
  var todoList = require('../controllers/todosController');


  // todoList Routes
  app.route('/todos')
    .get(todoList.get_todos)
    .post([bodyParser.urlencoded(),bodyParser.json()],todoList.create_todo);


  app.route('/todos/:todoId')
    .get(todoList.get_todo)
    .put([bodyParser.urlencoded(),bodyParser.json()],todoList.update_todo)
    .delete(todoList.delete_todo);
};

