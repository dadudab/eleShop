import { useState } from 'react';

import OrdersInfo from './DashboardCards/OrdersInfo';
import AmountInfo from './DashboardCards/AmountInfo';
import classes from './Dashboard.module.css';
import UsersInfo from './DashboardCards/UsersInfo';
import ProductsInfo from './DashboardCards/ProductsInfo';
import DashboardProducts from './DashboardProducts/DashboardProducts';
import Dropdown from '../UI/Dropdown';

const Dashboard = () => {
  return (
    <section className={classes.dashboardSection}>
      <h1>Dashboard</h1>
      <article className={classes.stats}>
        <OrdersInfo />
        <AmountInfo />
        <UsersInfo />
        <ProductsInfo />
      </article>
      <Dropdown title="Products" content={<DashboardProducts />} />
    </section>
  );
};

export default Dashboard;
