import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import classes from './ProductDetails.module.css';
import ErrorMessage from '../UI/ErrorMessage';
import Loading from '../UI/Loading';
import Button from '../UI/Button';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowMoreOpen, setIsShowMoreOpen] = useState(false);
  const { productId } = useParams();

  async function fetchProduct(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error('Cannot get product...');
      }
      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const showToggleHandler = () => {
    setIsShowMoreOpen((prevState) => !prevState);
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // description
  const desc = product.description;
  let productDescription;
  if (desc && desc.length < 100) {
    productDescription = <p>{product.description}</p>;
  } else if (desc) {
    productDescription = (
      <p>
        {isShowMoreOpen ? desc : desc.substring(0, 100)}
        <span className={classes.showLink} onClick={showToggleHandler}>
          {isShowMoreOpen ? 'Show less...' : 'Show more...'}
        </span>
      </p>
    );
  }

  return (
    <section className={classes.container}>
      {product.image && <img src={product.image.imageUrl} alt={product.name} />}
      <div className={classes.details}>
        <h2>{product.name}</h2>
        {productDescription}
        <h3>{product.price} $</h3>
        <div className={classes.actions}>
          <Link to={`/products`}>
            <Button>Back</Button>
          </Link>
          <Button className={classes.addBtn}>Add to cart</Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
