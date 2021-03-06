const Product = require('../models/product');
const { cloudinary } = require('../config/cloudinary');

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

    const imageString = product.image;
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
      folder: 'eleShop',
    });
    console.log(uploadResponse);

    const newProduct = new Product({
      ...product,
      image: {
        imageId: uploadResponse.public_id,
        imageUrl: uploadResponse.url,
      },
    });

    await newProduct.save();
    console.log(newProduct);

    return res.json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

// ----------------------------------------------------------------------------------
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
    const product = req.body;

    if (!product.image.imageUrl) {
      // get previous product and delete image from cloudinary
      const previousProduct = await Product.findById(productId);
      if (!previousProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await cloudinary.uploader.destroy(previousProduct.image.imageId);

      // add new image to cloudinary and save product
      const imageString = product.image;
      const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: 'eleShop',
      });
      console.log(uploadResponse);
      const updatedProduct = {
        ...product,
        image: {
          imageUrl: uploadResponse.url,
          imageId: uploadResponse.public_id,
        },
      };
      const newProduct = await Product.findByIdAndUpdate(
        productId,
        updatedProduct,
        {
          new: 'true',
        }
      );
      console.table(newProduct);
      return res.json(newProduct);
    }

    // update product without new image
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    console.log(updatedProduct);
    return res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Someting went wrong' });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const foundedProduct = await Product.findById(productId);

    if (!foundedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // delete image from cloudinary
    const imageId = foundedProduct.image.imageId;
    const deleteResponse = await cloudinary.uploader.destroy(imageId);
    console.log(deleteResponse);

    await Product.findByIdAndDelete(productId);
    return res.json({ message: 'Product deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.countProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json({ totalProducts: products.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
