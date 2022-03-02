const express = require('express');
const router = express.Router();

const {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
} = require('../controllers/cart');
const { isUserAuth } = require('../middlewares');

router.get('/cart', isUserAuth, getUserCart);
router.post('/cart/add/:productId', isUserAuth, addProductToCart);
router.post('/cart/remove/:productId', isUserAuth, removeProductFromCart);

module.exports = router;

// 620ad3f10aeb61cbd891e0f7
