import { useContext, useEffect, useState } from 'react';

import { RiShoppingCartLine } from 'react-icons/ri';
import classes from './CartButton.module.css';
import CartContext from '../../store/cart-context';
import AuthContext from '../../store/auth-context';

const CartButton = (props) => {
  const [cartProducts, setCartProducts] = useState([]);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  async function getUserCart() {
    try {
      const response = await fetch('http://localhost:5000/cart', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authCtx.token}`,
        },
      });

      const data = await response.json();
      setCartProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (authCtx.isLogged) {
      console.log('fetch user cart');
      getUserCart();
    }
  }, [authCtx.isLogged, ])

  let cartItemsLength;
  if (!authCtx.isLogged) {
    cartItemsLength = cartCtx.items.reduce((currentNumber, item) => {
      return currentNumber + item.amount;
    }, 0);
  } else {
    cartItemsLength = cartProducts.reduce((currentNumber, item) => {
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
