import { RiShoppingCartLine } from 'react-icons/ri';

import classes from './CartButton.module.css';

const CartButton = () => {
  return (
    <div className={classes.cartWrapper}>
      <RiShoppingCartLine className={classes.icon} />
      <span className={classes.amount}>10</span>
    </div>
  );
};

export default CartButton;

// RiShoppingCartLine
