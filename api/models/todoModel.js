'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ToDoSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  },
  description:{
    type:String  
  }
});

module.exports = mongoose.model('ToDos', ToDoSchema);