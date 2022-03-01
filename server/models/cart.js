const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Product',
    // },
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      _id: {
        _id: false,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
