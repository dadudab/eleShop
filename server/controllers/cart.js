const Cart = require('../models/Cart');
const Product = require('../models/Product');

module.exports.getUserCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products',
      populate: { path: 'product' },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Your cart is empty' });
    }

    return res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.addProductToCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products',
      populate: { path: 'product' },
    });
    const addedProduct = await Product.findOne({ _id: productId });

    if (!addedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!cart) {
      const newCart = new Cart({
        user: userId,
        products: [{ productId: productId, product: productId, quantity: 1 }],
        totalAmount: addedProduct.price,
      });
      await newCart.save();
      return res.json(newCart);
    }

    const existingCartItemIndex = cart.products.findIndex(
      (item) => item.productId === productId
    );
    const existingCartItem = cart.products[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        productId: existingCartItem.productId,
        product: existingCartItem.product,
        quantity: existingCartItem.quantity + 1,
      };
      const updatedTotalAmount = cart.totalAmount + addedProduct.price;

      cart.products[existingCartItemIndex] = updatedItem;
      cart.totalAmount = updatedTotalAmount;

      await cart.save();
      return res.json(cart);
    } else {
      cart.products.push({
        productId: productId,
        product: productId,
        quantity: 1,
      });
      const updatedTotalAmount = cart.totalAmount + addedProduct.price;
      cart.totalAmount = updatedTotalAmount;

      await cart.save();
      return res.json(cart);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Someting went wrong' });
  }
};

module.exports.removeProductFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products',
      populate: { path: 'product' },
    });
    const selectedProduct = await Product.findOne({ _id: productId });

    if (!selectedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartProductIndex = cart.products.findIndex(
      (item) => item.productId === productId
    );
    const cartProduct = cart.products[cartProductIndex];
    console.log(cartProduct.quantity);

    if (cartProduct.quantity > 1) {
      const updatedProduct = {
        productId: cartProduct.productId,
        product: cartProduct.product,
        quantity: cartProduct.quantity - 1,
      };
      const updatedTotalAmount = cart.totalAmount - selectedProduct.price;

      cart.products[cartProductIndex] = updatedProduct;
      cart.totalAmount = updatedTotalAmount;

      await cart.save();
      return res.json(cart);
    } else {
      const updatedProducts = cart.products.filter(
        (item) => item.productId !== productId
      );
      const updatedTotalAmount = cart.totalAmount - selectedProduct.price;

      cart.products = updatedProducts;
      cart.totalAmount = updatedTotalAmount;

      await cart.save();
      return res.json(cart);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
