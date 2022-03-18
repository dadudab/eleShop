import { Fragment, useContext, useState } from 'react';

import AuthContext from '../../../store/auth-context';
import Modal from '../../UI/Modal';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import ErrorMessage from '../../UI/ErrorMessage';
import classes from './DeleteProduct.module.css';

const DeleteProduct = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  async function deleteProduct() {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/products/${props.id}/delete`,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authCtx.token,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Cannot delete product');
      }
      props.fetchProducts();
      setIsLoading(false);
      props.onClose();
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  const deleteProductHandler = () => {
    deleteProduct();
  };

  let content = (
    <Fragment>
      <h2>{props.name}</h2>
      <p className={classes.confirmMsg}>
        Are you sure you want delete this product?
      </p>
      <div className={classes.deleteActions}>
        <Button className={classes.noBtn} onClick={props.onClose}>
          No
        </Button>
        <Button className={classes.yesBtn} onClick={deleteProductHandler}>
          Yes
        </Button>
      </div>
    </Fragment>
  );

  if (isLoading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <Fragment>
        <ErrorMessage>{error.message}</ErrorMessage>
        <Button className={classes.noBtn} onClick={props.onClose}>
          Close
        </Button>
      </Fragment>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      {/* <h2>{props.name}</h2>
      <p className={classes.confirmMsg}>
        Are you sure you want delete this product?
      </p>
      <div className={classes.deleteActions}>
        <Button className={classes.noBtn} onClick={props.onClose}>
          No
        </Button>
        <Button className={classes.yesBtn} onClick={deleteProductHandler}>
          Yes
        </Button>
      </div> */}
      {content}
    </Modal>
  );
};

export default DeleteProduct;
