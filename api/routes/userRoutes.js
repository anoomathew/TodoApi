module.exports = function(app, bodyParser, middleware) {
  var userControl = require('../controllers/userController');

  // user Routes
  app.route('/signin').post(userControl.sign_in);

  app.route('/signup').post(userControl.sign_up);

};
