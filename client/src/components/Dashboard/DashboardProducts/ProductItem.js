import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './ProductItem.module.css';
import Button from '../../UI/Button';
import DeleteProduct from './DeleteProduct';

const ProductItem = (props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const formatedDate = new Date(props.date);

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
  };

  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <li className={classes.item}>
      <p>
        <span className={classes.title}>Product ID:</span> {props.id}
      </p>
      <p>
        <span className={classes.title}>Name: </span> {props.name}
      </p>
      <p>
        <span className={classes.title}>Price: </span> {props.price}$
      </p>
      {/* add date here */}
      <div className={classes.actions}>
        <Link to={`/products/${props.id}`}>
          <Button>View</Button>
        </Link>
        <Link to={`/dashboard/products/${props.id}/update`}>
          <Button className={classes.updateBtn}>Update</Button>
        </Link>
        <Button className={classes.deleteBtn} onClick={openDeleteModalHandler}>
          Delete
        </Button>
        {/* delete product modal */}
        {isDeleteModalOpen && (
          <DeleteProduct
            onClose={closeDeleteModalHandler}
            name={props.name}
            id={props.id}
            fetchProducts={props.fetchProducts}
          />
        )}
      </div>
    </li>
  );
};

export default ProductItem;
