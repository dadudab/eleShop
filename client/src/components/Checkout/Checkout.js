import { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Checkout.module.css';
import CartContext from '../../store/cart-context';
import UserCartContext from '../../store/user-cart-context';
import Payment from './Payment';

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const userCartCtx = useContext(UserCartContext);

  let productsSummary = (
    <ul>
      {cartCtx.items.map((item) => {
        return (
          <li key={item.id} className={classes.checkoutItem}>
            <span>{item.name}</span>
            <span>x{item.amount}</span>
          </li>
        );
      })}
    </ul>
  );

  if (authCtx.isLogged && userCartCtx.userCart.products) {
    productsSummary = (
      <ul>
        {userCartCtx.userCart.products.map((item) => {
          return (
            <li key={item.product._id} className={classes.checkoutItem}>
              <span>{item.product.name}</span>
              <span>x{item.quantity}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  if (
    (!authCtx.isLogged && cartCtx.items.length === 0) ||
    (authCtx.isLogged && userCartCtx.totalProducts === 0)
  ) {
    return (
      <section className={classes.checkoutSection}>
        <div className={classes.checkoutWrapper}>
          <h2 style={{ color: 'white' }}>No items to buy</h2>
        </div>
      </section>
    );
  }

  return (
    <section className={classes.checkoutSection}>
      <div className={classes.checkoutWrapper}>
        <h2>Checkout</h2>
        {productsSummary}
        <p>
          Total Amount:{' '}
          {authCtx.isLogged
            ? userCartCtx.userCart.totalAmount
            : cartCtx.totalAmount}
          $
        </p>
        <div className={classes.checkoutActions}>
          <Payment />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
