import { useState, useContext, useEffect } from 'react';

import DashboardCard from '../../UI/DashboardCard';
import AuthContext from '../../../store/auth-context';
import Loading from '../../UI/Loading';

const asd = 35;

const ProductsInfo = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const [totalProducts, setTotalProducts] = useState(0);

  async function getCountedProducts() {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/products/count', {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Connot get counted products');
      }

      const data = await response.json();
      setTotalProducts(data.totalProducts);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCountedProducts();
    return () => {
      setTotalProducts(0);
    };
  }, [props.allProducts.length]);

  if (isLoading) {
    return <DashboardCard data={<Loading />} />;
  }

  return <DashboardCard name="Total products: " data={totalProducts} />;
};

export default ProductsInfo;
