var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var l = require('../config/lib');
var User = require('../models/user');


module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = l.config.secretKey;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
         if (err) {
           //Error
           return done(err, false);
         }
         if (user) {
           //User found
           done(null, user);
         } else {
           //No user found
           done(null, false);
         }
    });
  }));

};
