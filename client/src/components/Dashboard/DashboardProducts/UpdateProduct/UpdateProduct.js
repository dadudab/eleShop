import { useState, useContext, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import UpdateProductForm from './UpdateProductForm';
import classes from './UpdateProduct.module.css';
import AuthContext from '../../../../store/auth-context';
import ErrorMessage from '../../../UI/ErrorMessage';
import Loading from '../../../UI/Loading';

const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { productId } = useParams();

  async function addProduct(product) {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/products/${productId}/update`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authCtx.token}`,
          },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) {
        throw new Error('Cannot update product');
      }
      console.log(response);
      setIsLoading(false);
      history.replace('/dashboard/products');
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  }

  const addProductHandler = (updatedProduct) => {
    addProduct(updatedProduct);
    // console.log(updatedProduct);
  };

  let content = (
    <Fragment>
      <h1>Update Product</h1>
      <UpdateProductForm onAddProduct={addProductHandler} />
    </Fragment>
  );
  if (error) {
    content = <ErrorMessage>{error}</ErrorMessage>;
  }
  if (isLoading) {
    content = <Loading />;
  }

  return (
    <section className={classes.updateProduct}>
      <div className={classes.wrapper}>{content}</div>
    </section>
  );
};

export default UpdateProduct;
