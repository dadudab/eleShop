import { useState } from 'react';

import classes from './CheckoutNotAuthUser.module.css';
import CheckoutForm from './CheckoutForm';
import SummaryAndPayment from './SummaryAndPayment';

const CheckoutNotAuthUser = () => {
  const [isPayment, setIsPayment] = useState(false);

  const togglePaymentHandler = () => {
    setIsPayment((prevState) => !prevState);
  };

  return (
    <article>
      <div className={classes.checkoutWrapper}>
        <h2>Not auth checkout</h2>
        {isPayment ? (
          <SummaryAndPayment />
        ) : (
          <CheckoutForm onPaymentToggle={togglePaymentHandler} />
        )}
      </div>
    </article>
  );
};

export default CheckoutNotAuthUser;
