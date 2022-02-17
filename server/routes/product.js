const express = require('express');
const router = express.Router();

const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');
const { validateProduct } = require('../middlewares');

router.get('/products', getProducts);
router.post('/products/new', validateProduct, createProduct);
router.get('/products/:id', getSingleProduct);
router.put('/products/:id/update', validateProduct, updateProduct);
router.delete('/products/:id/delete', deleteProduct);

module.exports = router;
