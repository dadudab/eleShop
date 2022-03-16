import { useContext } from 'react';

import classes from './CartItem.module.css';
import Button from '../UI/Button';
import CartContext from '../../store/cart-context';
import UserCartContext from '../../store/user-cart-context';
import AuthContext from '../../store/auth-context';

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);
  const userCartCtx = useContext(UserCartContext);
  const authCtx = useContext(AuthContext);

  async function addToUserCart() {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/add/${props.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        console.log('some error');
      }

      const data = await response.json();
      userCartCtx.updateUserCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromUserCart() {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/remove/${props.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        console.log('some error');
      }

      const data = await response.json();
      userCartCtx.updateUserCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  const increaseAmountHandler = () => {
    if (authCtx.isLogged) {
      addToUserCart();
    } else {
      const cartItem = {
        id: props.id,
        name: props.name,
        price: props.price,
        amount: props.amount,
        imageUrl: props.image,
      };
      cartCtx.addToCart(cartItem);
    }
  };

  const decreaseAmountHandler = () => {
    if (authCtx.isLogged) {
      removeFromUserCart();
    } else {
      cartCtx.removeFromCart(props.id);
    }
  };

  return (
    <li className={classes.cartItem}>
      <img src={props.image} alt={props.name} />
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
