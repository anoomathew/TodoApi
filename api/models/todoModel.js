'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Kindly enter the name of the task']
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['Pending', 'Ongoing', 'Completed']
    }],
    default: ['Pending']
  },
  description:{
    type:String  
  },
  username:{
    type:String
  }
});

module.exports = mongoose.model('Todos', TodoSchema);