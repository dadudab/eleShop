import classes from './ProductItem.module.css';
import Button from '../../UI/Button';

const ProductItem = (props) => {
  return (
    <li className={classes.item}>
      <p>
        <span className={classes.title}>Product ID:</span> {props.id}
      </p>
      {/* <p>Name: {props.name}</p> */}
      <p>
        <span className={classes.title}>Name: </span> {props.name}
      </p>
      <p>
        <span className={classes.title}>Price: </span> {props.price}$
      </p>
      <div className={classes.actions}>
        <Button>View</Button>
        <Button className={classes.updateBtn}>Update</Button>
        <Button className={classes.deleteBtn}>Delete</Button>
      </div>
    </li>
  );
};

export default ProductItem;
