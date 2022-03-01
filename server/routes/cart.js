const express = require('express');
const router = express.Router();

const { getUserCart, addProductToCart } = require('../controllers/cart');
const { isUserAuth } = require('../middlewares');

router.get('/cart', isUserAuth, getUserCart);
router.post('/cart/add/:productId', isUserAuth, addProductToCart);

module.exports = router;

// 620ad3f10aeb61cbd891e0f7
