import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './DashboardProducts.module.css';
import ProductItem from './ProductItem';
import SearchItems from '../../UI/SearchBar';
import Button from '../../UI/Button';

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchString, setSearchString] = useState('');

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

  const changeSearchStringHandler = (event) => {
    setSearchString(event.target.value.toLowerCase());
  };

  const filteredData = products.filter((item) => {
    if (searchString === '') {
      return item;
    } else {
      return (
        item.name.toLowerCase().includes(searchString) ||
        item._id.includes(searchString)
      );
    }
  });

  const filteredDataIsEmpty = filteredData.length === 0;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <Link to="/dashboard/products/new">
        <Button className={classes.newBtn}>New Product</Button>
      </Link>
      <SearchItems
        for="products"
        id="products"
        placeholder="id, name"
        onChange={changeSearchStringHandler}
      />
      {filteredDataIsEmpty && <h3 style={{ marginTop: '1rem' }}>No results</h3>}
      <ul>
        {filteredData.map((item) => {
          return (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              date={item.date}
              fetchProducts={getProducts}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default DashboardProducts;
