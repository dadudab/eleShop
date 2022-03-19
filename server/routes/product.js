const express = require('express');
const router = express.Router();
const { isUserAdmin } = require('../middlewares');
const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');
const { validateProduct } = require('../middlewares');

// Routes
router.get('/products', getProducts);
router.post('/products/new', isUserAdmin, validateProduct, createProduct);
router.get('/products/:id', getSingleProduct);
router.put('/products/:id/update', isUserAdmin, validateProduct, updateProduct);
router.delete('/products/:id/delete', isUserAdmin, deleteProduct);

module.exports = router;
