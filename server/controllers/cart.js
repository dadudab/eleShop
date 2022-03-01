const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/user');

module.exports.getUserCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    console.log(cart);
    return res.json(cart);
  } catch (error) {
    console.log(error);
  }

  //   try {
  //     const cart = await Cart.find({});
  //     return res.json(cart);
  //   } catch (error) {
  //     console.log(error);
  //   }
};

module.exports.addProductToCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    const addedProduct = await Product.findOne({ _id: productId });

    if (!addedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!cart) {
      const newCart = new Cart({
        user: userId,
        products: [{ productId, quantity: 1 }],
        totalAmount: addedProduct.price,
      });
      await newCart.save();
      return res.json(newCart);
    }

    const updatedCart = await Cart.updateOne(
      { user: userId },
      {
        $inc: { products: { quantity: 5 } },
      }
    );

    return res.json(updatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Someting went wrong' });
  }
};
