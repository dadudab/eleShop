import DashboardCard from '../../UI/DashboardCard';

const totalTransactions = 93;

const OrdersInfo = () => {
  return <DashboardCard name="Total orders: " data={totalTransactions} />;
};

export default OrdersInfo;
