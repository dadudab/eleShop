import { useState, useEffect, useContext } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Button from '../UI/Button';

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    setCartItems(cartCtx.items);
    console.log('set cart items');
  }, [cartCtx.items]);

  return (
    <Modal onClose={props.onCloseCart}>
      <h2>Your Cart</h2>
      <ul className={classes.cartList}>
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              amount={item.amount}
            />
          );
        })}
      </ul>
      <div className={classes.cartContainer}>
        <div className={classes.cartActions}>
          <Button onClick={props.onCloseCart}>Close</Button>
          <Button className={classes.orderBtn}>Order</Button>
        </div>
        <p>Total: {cartCtx.totalAmount}$</p>
      </div>
    </Modal>
  );
};

export default Cart;
