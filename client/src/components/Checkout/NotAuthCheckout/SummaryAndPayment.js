import { useContext } from 'react';

import classes from './SummaryAndPayment.module.css';
import CartContext from '../../../store/cart-context';

const SummaryAndPayment = () => {
  const cartCtx = useContext(CartContext);

  //   if (cartCtx.items.length === 0) {
  //     return <a href="#">Here you can add product</a>;
  //   }
  console.log(cartCtx);
  const roundedTotalAmount = cartCtx.totalAmount.toFixed(2);

  return (
    <div className={classes.container}>
      <h3>Summary</h3>
      <ul>
        {cartCtx.items.map((product) => {
          return (
            <li className={classes.summaryItem} key={product.id}>
              <span>{product.name}</span>
              <span>x{product.amount}</span>
            </li>
          );
        })}
      </ul>
      <h4>Total Amount: {roundedTotalAmount} $</h4>
      <h3>Payment</h3>
      <div>payment content</div>
    </div>
  );
};

export default SummaryAndPayment;
