import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './ProductItem.module.css';
import Button from '../UI/Button';
import CartContext from '../../store/cart-context';
import AuthContext from '../../store/auth-context';
import UserCartContext from '../../store/user-cart-context';

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const userCartCtx = useContext(UserCartContext);

  async function addToCart() {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/add/${props.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authCtx.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      userCartCtx.updateUserCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  const addToCartHandler = () => {
    if (authCtx.isLogged) {
      addToCart();
    } else {
      const item = {
        id: props.id,
        name: props.name,
        price: props.price,
        amount: 1,
      };
      cartCtx.addToCart(item);
    }
  };

  return (
    <li className={classes.item}>
      <img
        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80"
        alt={props.name}
      />
      <div className={classes.content}>
        <div className={classes.container}>
          <h3>{props.name}</h3>
          <span>{props.price}$</span>
        </div>
        <div className={classes.actions}>
          <Link to={`/products/${props.id}`}>
            <Button>View</Button>
          </Link>
          <Button className={classes.addBtn} onClick={addToCartHandler}>
            Add to cart
          </Button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
