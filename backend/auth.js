var express = require('express');
var User = require('./models/user');
var router = express.Router();
var l=require('./config/lib');


module.exports = function(passport, jwt) {
  var api = {};

  api.register = function(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({msg: 'No user email/password provided'});
    } else {
      var newUser = new User(req.body);
      newUser.password = newUser.generateHash(req.body.password);

      // save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err.code);
          var msg = '';
          if(err.code == 11000) msg = 'Duplicate email or username'
          else msg = 'Missing required field';
          return res.status(500).json({msg: msg});
        }
        res.status(201).json({msg: 'Successful created new user.'});
      });
    }
  }
  api.login = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(404).json({msg: 'User not found.'});
      } else {
        // check if password matches
        if(!user.validPassword(req.body.password)) {
          return res.status(500).json({msg: 'Invalid password'});
        } else {
          var token = jwt.sign(user, l.config.secretKey, {expiresIn: 100800});
          return res.status(200).json({token: 'JWT ' + token});
        }
      }
    });
  }

  router.post('/register', api.register);
  router.post('/login', api.login);
  // router.get('/test', passport.authenticate('jwt', {session: false}), function(req,res) {
  //    res.send('It worked! User id is: ' + req.user._id + '.');
  // });
  router.get('/test', function(req,res) {
    //  res.send('It worked! User id is: ' + req.user._id + '.');
    var msg = '';
     passport.authenticate('jwt', function(err,user,info) {
       console.log('wol');
        if (err) { return next(err); }
        if (!user) 'User not found'
        else msg = 'User is ' + user.username;
     });
    //  res.send(msg);
  });

  return router;
}
