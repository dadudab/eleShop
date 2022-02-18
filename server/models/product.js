const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must not be empty'],
  },
  description: {
    type: String,
    required: [true, 'Description must not be empt!'],
  },
  price: {
    type: Number,
    required: [true, 'Price must not be empty'],
  },
  categories: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productShema);
module.exports = Product;
