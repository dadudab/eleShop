import { useEffect, useState } from 'react';

import ProductItem from './ProductItem';

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await fetch('http://localhost:5000/products', {
        mode: 'cors',
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Cannot fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ul>
      {products.map((item) => {
        return (
          <ProductItem id={item._id} name={item.name} price={item.price} />
        );
      })}
    </ul>
  );
};

export default DashboardProducts;
