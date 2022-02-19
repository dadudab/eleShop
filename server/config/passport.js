const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      (email, password, done) => {
        User.findOne({ email }, (err, user) => {
          try {
            if (!user) {
              return done(null, false, {
                message: 'Email or password incorrect',
              });
            }

            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                console.log('err');
                throw new Error('Something went wrong...');
              }
              if (result) {
                console.log('result');
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
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
