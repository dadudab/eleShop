import DashboardCard from '../../UI/DashboardCard';

const totalTransactions = 93;

const OrdersInfo = () => {
  return <DashboardCard label="Total orders: " data={totalTransactions} />;
};

export default OrdersInfo;
