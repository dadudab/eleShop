const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      // product: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Product',
      // },
      productId: {
        type: String,
        required: true,
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
