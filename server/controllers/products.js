// const { json } = require('express');
const Product = require('../models/Product');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const product = req.body.product;
    const newProduct = new Product(product);

    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.json({
      error: {
        status: 400,
        message: error.message,
      },
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = req.body.product;

    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    return res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.json({
      error: {
        status: 400,
        message: 'Failed to get product',
      },
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    console.log(error);
    return res.json({
      error: {
        status: 500,
        message: 'Cannot delete product',
      },
    });
  }
};
