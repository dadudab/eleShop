import { useState, useEffect, useContext, Fragment } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Button from '../UI/Button';
import UserCartContext from '../../store/user-cart-context';
import AuthContext from '../../store/auth-context';

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const cartCtx = useContext(CartContext);
  const userCartCtx = useContext(UserCartContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setCartItems(cartCtx.items);
    if (authCtx.isLogged) {
      console.log('setting user cart');
      setCartItems(userCartCtx.userCart.products);
    }
  }, [cartCtx.items, authCtx.isLogged, userCartCtx.userCart.products]);

  if (authCtx.isLogged) {
    // const noUserCart = userCartCtx.userCart.message ? true : false;
    const isUserCartEmpty = userCartCtx.userCart.products.length === 0;

    let cartContent;
    if (isUserCartEmpty) {
      cartContent = (
        <Fragment>
          <h2>Your Cart</h2>
          <h3>Your cart is empty</h3>
        </Fragment>
      );
    } else {
      cartContent = (
        <Fragment>
          <h2>Your Cart</h2>
          <ul className={classes.cartList}>
            {cartItems.map((item) => {
              return (
                <CartItem
                  key={item.product._id}
                  id={item.product._id}
                  name={item.product.name}
                  price={item.product.price}
                  amount={item.quantity}
                />
              );
            })}
          </ul>
        </Fragment>
      );
    }

    return (
      <Modal onClose={props.onCloseCart}>
        {cartContent}
        <div className={classes.cartContainer}>
          <div className={classes.cartActions}>
            <Button onClick={props.onCloseCart}>Close</Button>
            {!isUserCartEmpty && (
              <Button className={classes.orderBtn}>Order</Button>
            )}
          </div>
          <p>
            Total:{' '}
            {isUserCartEmpty
              ? '0.00'
              : userCartCtx.userCart.totalAmount.toFixed(2)}
            $
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={props.onCloseCart}>
      <h3>Your Cart</h3>
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
          {cartCtx.items.length !== 0 && (
            <Button className={classes.orderBtn}>Order</Button>
          )}
        </div>
        <p>Total: {cartCtx.totalAmount}$</p>
      </div>
    </Modal>
  );
};

export default Cart;
