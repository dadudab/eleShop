import OrdersInfo from './OrdersInfo';
import AmountInfo from './AmountInfo';
import classes from './Dashboard.module.css';
import UsersInfo from './UsersInfo';
import ProductsInfo from './ProductsInfo';
import DashboardProducts from './DashboardProducts/DashboardProducts';

// const DUMMY

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
      <article className={classes.products}>
        <div className={classes.wrapper}>
          <DashboardProducts />
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
