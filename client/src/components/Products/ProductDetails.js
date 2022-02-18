import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import classes from './ProductDetails.module.css';
import Message from '../UI/Message';
import Loading from '../UI/Loading';
import Button from '../UI/Button';

const DUMMY_DESC =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eum ut odio nesciunt. Veniam reiciendis ipsum provident. Esse rem asperiores tempora earum quos neque illum reprehenderit, exercitationem a consequatur! Laudantium.Necessitatibus eaque amet similique placeat atque doloremque distinctio qui? In tempore consequuntur quas quibusdam animi, similique officia perferendis voluptatum repudiandae laudantium laboriosam veritatis dolor dolorem tempora quo ducimus facere iste.Suscipit at impedit molestiae quod, distinctio voluptas, necessitatibus nulla laudantium minus nobis exercitationem minima et officiis debitis quam aperiam dolorum corrupti, doloribus tenetur rem maxime repellat. Exercitationem atque voluptate ut.';

// const DUMMY_DESC = 'asdasd asd ddd';

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
  }, []);

  const showToggleHandler = () => {
    setIsShowMoreOpen((prevState) => !prevState);
  };

  if (error) {
    return <Message>{error}</Message>;
  }

  if (isLoading) {
    return <Loading />;
  }

  let description;
  if (DUMMY_DESC.length < 100) {
    description = <p>{DUMMY_DESC}</p>;
  } else {
    description = (
      <p>
        {isShowMoreOpen ? DUMMY_DESC : DUMMY_DESC.substring(0, 100)}
        <span className={classes.showLink} onClick={showToggleHandler}>
          {isShowMoreOpen ? 'Show less...' : 'Show more...'}
        </span>
      </p>
    );
  }

  return (
    <section className={classes.container}>
      <img
        src="https://images.unsplash.com/photo-1613141411244-0e4ac259d217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt={product.name}
      />
      <div className={classes.details}>
        <h1>{product.name}</h1>
        {description}
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
