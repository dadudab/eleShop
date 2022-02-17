import { useState, useEffect } from 'react';

import classes from './ProductList.module.css';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:5000/products', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response);
      if (!response.ok) {
        throw new Error('Cannot get products...');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <ul className={classes.productList}>
      {products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        );
      })}
    </ul>
  );
};

export default ProductList;
