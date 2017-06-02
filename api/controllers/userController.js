'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  User = mongoose.model('Users');

exports.sign_up = function(req, res) {
        User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    data:{message: "Error occured: " + err} 
                });
            } else {
                if (user) {
                    res.json({
                        success: false,
                        data :{ message: "User already exists!"}
                    });
                } else 
                {
                    var new_user = new User(req.body);
                    new_user.save(function(err, user) {
                        if (err)
                            res.json({ success:false, data:{message: err }});
                        res.json({success:true, data:{ message: ' Signup Successful'}});
                    });
                }
            }
        });
}

exports.sign_in = function(req, res) {
        User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    data:{message: "Error occured: " + err} 
                });
            } else {

                User.findOne({username: req.body.username}, function(err, user) {
                if (err)
                    res.json({ success:false, data:{message: err }});
                if (!user) {
                    res.json({ success: false, data:{message: 'Authentication failed. User not found.' }});
                } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({success:false, data:{message: 'Authentication failed. Wrong password.' }});
                } else {

                    // if user is found and password is right
                    // create a token
                    var secret= process.env.SECRET || 'ToDoToken123';
                    var token = jwt.sign(user,secret,{
                        expiresIn : '1h' // expires in 24 hours
                    });
                    
                    var details = {name: user.name, username: user.username};
                    // return the information including token as JSON
                    res.json({success:true, data:{
                        user: details,
                        token: token
                    }});
                }   

                }
            });

            }
        });
    }

exports.update_user = function(req, res) {
  User.findOneAndUpdate({username:req.body.username} , {new: true}, function(err, user) {
    if (err)
      res.send({ message: err });
    res.json({ message: 'User successfully updated' });
  });
};


exports.delete_user = function(req, res) {
  User.remove({
    username: req.params.username
  }, function(err, user) {
    if (err)
      res.send({ message: err });
    res.json({ message: 'User successfully deleted' });
  });
};
