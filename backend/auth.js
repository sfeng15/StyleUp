var express = require('express');
var User = require('./models/user');
var router = express.Router();
var l=require('./config/lib');


module.exports = function(passport, jwt) {
  var api = {};

  api.register = function(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
      res.json({msg: 'No user email/password provided'});
    } else {
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.password = newUser.generateHash(req.body.password);
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({msg: 'Email already exists.'});
        }
        res.json({msg: 'Successful created new user.'});
      });
    }
  }
  api.login = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.send({msg: 'User not found.'});
      } else {
        // check if password matches
        if(!user.validPassword(req.body.password)) {
          return res.json({msg: 'Invalid password'});
        } else {
          var token = jwt.sign(user, l.config.secretKey, {expiresIn: 100800});
          return res.json({token: 'JWT ' + token});
        }
      }
    });
  }

  router.post('/register', api.register);
  router.post('/login', api.login);
  router.get('/test', passport.authenticate('jwt', {session: false}), function(req,res) {
     res.send('It worked! User id is: ' + req.user._id + '.');
  });

  return router;
}
