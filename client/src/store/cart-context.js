import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addToCart: (item) => {},
  removeFromCart: (id) => {}
});

export default CartContext;
