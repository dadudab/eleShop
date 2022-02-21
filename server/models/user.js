const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'FirstName must not be empty!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name must not be empty'],
  },
  city: {
    type: String,
    required: [true, 'City must not be empty'],
  },
  address: {
    type: String,
    required: [true, 'Addres must not be empty'],
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code must not be empty'],
  },
  email: {
    type: String,
    required: [true, 'Email must not be empty'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password must not be empty'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
