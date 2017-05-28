'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TodoSchema = new Schema({
  name: {
    type: String,
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

module.exports = mongoose.model('Todos', TodoSchema);