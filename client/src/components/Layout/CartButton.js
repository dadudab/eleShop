import { useContext } from 'react';

import { RiShoppingCartLine } from 'react-icons/ri';
import classes from './CartButton.module.css';
import CartContext from '../../store/cart-context';

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemsLength = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  return (
    <div className={classes.cartWrapper} onClick={props.onCartOpen}>
      <RiShoppingCartLine className={classes.icon} />
      <span className={classes.amount}>{cartItemsLength}</span>
    </div>
  );
};

export default CartButton;

// RiShoppingCartLine
