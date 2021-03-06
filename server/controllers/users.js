const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Cart = require('../models/cart');
// const Product = require('../models/product');

module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, city, address, postalCode, email, password } =
    req.body;

  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      firstName,
      lastName,
      city,
      address,
      postalCode,
      email,
      password: hashedPassword,
    });

    const newCart = new Cart({
      user: createdUser._id,
      products: [],
      totalAmount: 0,
    });
    await newCart.save();

    const token = jwt.sign(
      {
        id: createdUser._id,
        isAdmin: createdUser.isAdmin,
      },
      'test',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Someting went wrong' });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Email or password incorrect' });
    }

    const token = jwt.sign(
      {
        isAdmin: existingUser.isAdmin,
        id: existingUser._id,
      },
      'test',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Someting went wrong' });
  }
};

module.exports.countUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ totalUsers: users.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
