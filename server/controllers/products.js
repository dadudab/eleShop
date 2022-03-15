// const { json } = require('express');
const Product = require('../models/product');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);

    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
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
    return res.status(500).json({ message: 'Someting went wrong' });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
