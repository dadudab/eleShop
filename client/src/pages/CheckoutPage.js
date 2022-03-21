import { useContext } from 'react';

import classes from './CheckoutPage.module.css';
import CheckoutAuthUser from '../components/Checkout/AuthCheckout/CheckoutAuthUser';
import CheckoutNotAuthUser from '../components/Checkout/NotAuthCheckout/CheckoutNotAuthUser';
import AuthContext from '../store/auth-context';

const CheckoutPage = () => {
  const authCtx = useContext(AuthContext);

  let content;
  if (!authCtx.isLogged) {
    content = <CheckoutNotAuthUser />;
  } else {
    content = <CheckoutAuthUser />;
  }

  return (
    <section className={classes.checkoutSection}>
      {/* <article className={classes.checkout}>{content}</article> */}
      {content}
    </section>
  );
};

export default CheckoutPage;
