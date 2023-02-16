const PassportJWT = require('passport-jwt');
const config = require('./config');
const jwtOptions = {};
const passport = require('passport');
const User = require('../models/user');

jwtOptions.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.jwtSecret;

passport.use(
  new PassportJWT.Strategy(jwtOptions, (payload, done) => {
    User.findOne({ _id: payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);
