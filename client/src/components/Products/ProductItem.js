import { Link } from 'react-router-dom';

import classes from './ProductItem.module.css';
import Button from '../UI/Button';

const ProductItem = (props) => {
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
          <Button className={classes.addBtn}>Add to cart</Button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;