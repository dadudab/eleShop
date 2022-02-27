import { useContext } from 'react';

import classes from './CartItem.module.css';
import Button from '../UI/Button';
import CartContext from '../../store/cart-context';

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  const increaseAmountHandler = () => {
    const cartItem = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: props.amount,
    };

    cartCtx.addToCart(cartItem);
  };

  const decreaseAmountHandler = () => {
    cartCtx.removeFromCart(props.id);
  };

  return (
    <li className={classes.cartItem}>
      <img
        src="https://images.unsplash.com/photo-1613141411244-0e4ac259d217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt={props.name}
      />
      <div className={classes.contentWrapper}>
        <h4>{props.name}</h4>
        <p>{props.price}$</p>
      </div>
      <div className={classes.amountActions}>
        <Button onClick={increaseAmountHandler}>+</Button>
        <span>{props.amount}</span>
        <Button onClick={decreaseAmountHandler}>-</Button>
      </div>
    </li>
  );
};

export default CartItem;
