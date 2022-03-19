import { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../../../store/auth-context';
import classes from './NewProduct.module.css';
import ProductForm from './ProductForm';
import ErrorMessage from '../../../UI/ErrorMessage';
import Loading from '../../../UI/Loading';

const NewProduct = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  async function createNewProduct(product) {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/products/new', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Cannot add product');
      }

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      history.replace('/dashboard');
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const createProductHandler = (product) => {
    createNewProduct(product);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <section className={classes.newProduct}>
        <div className={classes.wrapper}>
          <h1>New Product</h1>
          <ProductForm onAddProduct={createProductHandler} />
        </div>
      </section>
    </Fragment>
  );
};

export default NewProduct;
