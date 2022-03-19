import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './DashboardProducts.module.css';
import ProductItem from './ProductItem';
import SearchItems from '../../UI/SearchBar';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import ErrorMessage from '../../UI/ErrorMessage';

const DashboardProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getProducts() {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/products', {
        mode: 'cors',
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Cannot fetch products');
      }
      const data = await response.json();
      setProducts(data);
      props.onGetData(products);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
    return () => {
      setProducts([]);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage className={classes.errorMsg}>{error}</ErrorMessage>;
  }

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
