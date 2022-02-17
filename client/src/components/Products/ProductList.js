import { useState, useEffect } from 'react';

import classes from './ProductList.module.css';
import ProductItem from './ProductItem';
import Message from '../UI/Message';
import Loading from '../UI/Loading';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/products', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error('Cannot get products...');
      }
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return <Message>{error}</Message>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className={classes.productList}>
      {products.map((product) => {
        return (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
          />
        );
      })}
    </ul>
  );
};

export default ProductList;
