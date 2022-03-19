import { useState } from 'react';

import OrdersInfo from './DashboardCards/OrdersInfo';
import AmountInfo from './DashboardCards/AmountInfo';
import classes from './Dashboard.module.css';
import UsersInfo from './DashboardCards/UsersInfo';
import ProductsInfo from './DashboardCards/ProductsInfo';
import DashboardProducts from './DashboardProducts/DashboardProducts';
import Dropdown from '../UI/Dropdown';

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState([]);

  const productsHandler = (products) => {
    setAllProducts(products);
  };

  return (
    <section className={classes.dashboardSection}>
      <h1>Dashboard</h1>
      <article className={classes.stats}>
        <OrdersInfo />
        <AmountInfo />
        <UsersInfo />
        <ProductsInfo allProducts={allProducts} />
      </article>
      <Dropdown
        title="Products"
        content={<DashboardProducts onGetData={productsHandler} />}
      />
    </section>
  );
};

export default Dashboard;
