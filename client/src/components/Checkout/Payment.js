import { useEffect, useState, useContext } from 'react';

import StripeCheckout from 'react-stripe-checkout';
import AuthContext from '../../store/auth-context';
import CartContext from '../../store/cart-context';
import UserCartContext from '../../store/user-cart-context';
import Loading from '../UI/Loading';
import ErrorMessage from '../UI/ErrorMessage';

const Payment = () => {
  const [stripeToken, setStripeToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const userCartCtx = useContext(UserCartContext);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const totalAmount = authCtx.isLogged
    ? userCartCtx.userCart.totalAmount
    : cartCtx.totalAmount;

  useEffect(() => {
    const createPayment = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId: stripeToken.id,
            amount: totalAmount,
          }),
        });
        const data = await response.json();
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError('Something went wrong');
      }
    };

    stripeToken && createPayment();
  }, [stripeToken]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <StripeCheckout
      token={onToken}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      billingAddress
      name="EleShop S.A."
      description={`Total: ${totalAmount}$`}
      image="https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3Ryb25pYyUyMGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    />
  );
};

export default Payment;
