import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  return <h1>{productId}</h1>;
};

export default ProductDetails;
