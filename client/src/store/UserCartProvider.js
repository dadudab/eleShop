import React, { useEffect, useReducer, useState, useContext } from 'react';

import AuthContext from './auth-context';
import UserCartContext from "./user-cart-context";

const defaultUserCartState = {
  userCart: {}
}

const userCartReducer = (state, action) => {

  if(action.type === 'GET_USER_CART') {
    return {
      userCart: action.userCart
    }
  }

  if(action.type === 'ADD_TO_USER_CART') {
    return {
      userCart: action.updatedCart
    }
  }

  return defaultUserCartState;
};

const UserCartProvider = (props) => {
  const [userCartState, dispatchUserCart] = useReducer(userCartReducer, defaultUserCartState);
  const authCtx = useContext(AuthContext);

  async function getUserCart() {
    try {
      const response = await fetch(
        `http://localhost:5000/cart`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authCtx.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      dispatchUserCart({ type: 'GET_USER_CART', userCart: data});
      console.log(userCartState);
    } catch (error) {
      console.log(error);
    }
  }

  const getUserCartHandler = () => {
    getUserCart();
  };

  const addProductToUserCartHandler = (cart) => {
    dispatchUserCart({ type: 'ADD_TO_USER_CART', updatedCart: cart})
  };
  //  const [userCart, setUserCart] = useState({});
  //  const authCtx = useContext(AuthContext);

  //  async function getUserCart() {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/cart`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${authCtx.token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     console.log(data);
  //     setUserCart(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //  useEffect(() => {
  //     if(authCtx.isLogged) {
  //       console.log('get logged user cart');
  //        getUserCart();
  //     }
  //  }, [authCtx.isLogged]);

  useEffect(() => {
    if(authCtx.isLogged) {
      getUserCartHandler();
    }
  }, [authCtx.isLogged]);

  

   const userCartContext = {
      userCart: userCartState.userCart,
      addToUserCart: addProductToUserCartHandler
   }

   return <UserCartContext.Provider value={userCartContext}>
      {props.children}
   </UserCartContext.Provider>
};

export default UserCartProvider;