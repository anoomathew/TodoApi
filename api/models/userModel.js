'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Kindly enter your name.']
  },
  username: {
      type: String,
      required: [true, 'Kindly enter username.']
  },
  password:{
      type: String,
      required: [true, 'Kindly enter password.']
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Users', UserSchema);