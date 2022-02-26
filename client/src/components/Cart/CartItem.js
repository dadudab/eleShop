import classes from './CartItem.module.css';

const CartItem = (props) => {
  return (
    <li className={classes.cartItem}>
      <h3>{props.name}</h3>
      <img
        src="https://images.unsplash.com/photo-1613141411244-0e4ac259d217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt={props.name}
      />
    </li>
  );
};

export default CartItem;
