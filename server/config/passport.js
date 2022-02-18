const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        try {
          if (!user) {
            return done(null, false, {
              message: 'Email or password incorrect',
            });
          }

          bcrypt.compare(password, hash, (err, result) => {
            if (err) {
              throw new Error('Something went wrong...');
            }
            if (result) {
              return done(null, user, { message: 'User logged in' });
            }
            return done(null, false, {
              message: 'Email or passwrod incorrect',
            });
          });
        } catch (error) {
          console.log(error);
        }
      });
    })
  );
};
