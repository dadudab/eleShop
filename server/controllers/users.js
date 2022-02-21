const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, city, address, postalCode, email, password } =
      req.body;

    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error('Registration failed');
      }
      const newUser = User({
        firstName,
        lastName,
        city,
        address,
        postalCode,
        email,
        password: hash,
      });
      await newUser;
      try {
        await newUser.save();
        req.login(newUser, (err) => {
          if (err) {
            throw new Error('Cannot login user');
          }
          return res.json(newUser);
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = (req, res, next) => {
  passport.authenticate('local')(req, res, next);
  console.log(req.user);
};
