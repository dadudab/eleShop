/** @format */

import React, { useEffect, useReducer, useState, useContext } from 'react';

import AuthContext from './auth-context';
import UserCartContext from './user-cart-context';

const defaultUserCartState = {
  userCart: {},
  totalProducts: 0,
};

const userCartReducer = (state, action) => {
  if (action.type === 'GET_USER_CART') {
    const totalProducts = action.userCart.products.reduce(
      (currentNumber, item) => {
        return currentNumber + item.quantity;
      },
      0
    );
    return {
      userCart: action.userCart,
      totalProducts: totalProducts,
    };
  }

  if (action.type === 'UPDATE_USER_CART') {
    const totalProducts = action.updatedCart.products.reduce(
      (currentNumber, item) => {
        return currentNumber + item.quantity;
      },
      0
    );
    return {
      userCart: action.updatedCart,
      totalProducts: totalProducts,
    };
  }

  return defaultUserCartState;
};

const UserCartProvider = (props) => {
  const [userCartState, dispatchUserCart] = useReducer(
    userCartReducer,
    defaultUserCartState
  );
  const authCtx = useContext(AuthContext);

  async function getUserCart() {
    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      dispatchUserCart({ type: 'GET_USER_CART', userCart: data });
      console.log(userCartState);
    } catch (error) {
      console.log(error);
    }
  }

  const getUserCartHandler = () => {
    getUserCart();
  };

  const updateUserCartHandler = (cart) => {
    dispatchUserCart({ type: 'UPDATE_USER_CART', updatedCart: cart });
  };

  useEffect(() => {
    if (authCtx.isLogged) {
      getUserCartHandler();
    }
  }, [authCtx.isLogged]);

  const userCartContext = {
    userCart: userCartState.userCart,
    totalProducts: userCartState.totalProducts,
    updateUserCart: updateUserCartHandler,
  };

  return (
    <UserCartContext.Provider value={userCartContext}>
      {props.children}
    </UserCartContext.Provider>
  );
};

export default UserCartProvider;
