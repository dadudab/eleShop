import { useContext, useEffect, useState } from 'react';

import { RiShoppingCartLine } from 'react-icons/ri';
import classes from './CartButton.module.css';
import CartContext from '../../store/cart-context';
import AuthContext from '../../store/auth-context';

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  let cartItemsLength;
  if (!authCtx.isLogged) {
    cartItemsLength = cartCtx.items.reduce((currentNumber, item) => {
      return currentNumber + item.amount;
    }, 0);
  } else {
    cartItemsLength = cartCtx.items.reduce((currentNumber, item) => {
      return currentNumber + item.quantity;
    }, 0);
    
  }

  return (
    <div className={classes.cartWrapper} onClick={props.onCartOpen}>
      <RiShoppingCartLine className={classes.icon} />
      <span className={classes.amount}>{cartItemsLength}</span>
    </div>
  );
};

export default CartButton;

// RiShoppingCartLine
