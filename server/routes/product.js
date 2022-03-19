const express = require('express');
const router = express.Router();
const { isUserAdmin, isUserAuth } = require('../middlewares');
const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  countProducts,
} = require('../controllers/products');
const { validateProduct } = require('../middlewares');

// Routes
router.get('/products', getProducts);
router.get('/products/count', isUserAuth, isUserAdmin, countProducts);
router.post(
  '/products/new',
  isUserAuth,
  isUserAdmin,
  validateProduct,
  createProduct
);
router.get('/products/:id', getSingleProduct);
router.put(
  '/products/:id/update',
  isUserAuth,
  isUserAdmin,
  validateProduct,
  updateProduct
);
router.delete('/products/:id/delete', isUserAuth, isUserAdmin, deleteProduct);

module.exports = router;
