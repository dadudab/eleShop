import React, { useReducer } from 'react';

import CartContext from './cart-context';

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      const updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      const updatedTotalAmount = +state.totalAmount + action.item.price;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount.toFixed(2),
      };
    }
    if (!existingCartItem) {
      const updatedItems = [...state.items, action.item];
      const updatedTotalPrice = +state.totalAmount + action.item.price;
      console.log(existingCartItem);
      return {
        items: updatedItems,
        totalAmount: updatedTotalPrice.toFixed(2),
      };
    }
  }

  if (action.type === 'REMOVE_CART_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.itemId
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem.amount > 1) {
      // update cart item
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      const updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      // update total price
      const updatedTotalAmount = +state.totalAmount - existingCartItem.price;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount.toFixed(2),
      };
    }
    if (existingCartItem === 1) {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.itemId
      );
      const updatedTotalAmount = +state.totalAmount - existingCartItem.price;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount.toFixed(2),
      };
    }
  }

  return {
    items: [],
    totalAmount: 0,
  };
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialCartState);

  const addCartItemHandler = (item) => {
    dispatchCart({ type: 'ADD_CART_ITEM', item: item });
  };

  const removeCartItemHandler = (itemId) => {
    dispatchCart({ type: 'REMOVE_CART_ITEM', itemId: itemId });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addToCart: addCartItemHandler,
    removeFromCart: removeCartItemHandler,
  };

  console.log(cartState);
  console.log(+cartState.totalAmount);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
