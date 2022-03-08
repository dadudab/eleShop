import { useState } from 'react';

import OrdersInfo from './OrdersInfo';
import AmountInfo from './AmountInfo';
import classes from './Dashboard.module.css';
import UsersInfo from './UsersInfo';
import ProductsInfo from './ProductsInfo';
import DashboardProducts from './DashboardProducts/DashboardProducts';

// const DUMMY

const Dashboard = () => {
  const [isProductListOpen, setIsProductListOpen] = useState(false);

  const toggleProductsHandler = () => {
    setIsProductListOpen((prevState) => !prevState);
    console.log(isProductListOpen);
  };

  return (
    <section className={classes.dashboardSection}>
      <h1>Dashboard</h1>
      <article className={classes.stats}>
        <OrdersInfo />
        <AmountInfo />
        <UsersInfo />
        <ProductsInfo />
      </article>
      <article className={classes.products}>
        <div className={classes.wrapper}>
          <h2 onClick={toggleProductsHandler}>
            Products
            <div
              className={
                isProductListOpen ? classes.arrowDown : classes.arrowUp
              }
            ></div>
          </h2>
          {isProductListOpen && <DashboardProducts />}
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
