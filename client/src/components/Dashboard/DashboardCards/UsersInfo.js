import DashboardCard from '../../UI/DashboardCard';

const totalUsers = 1293;

const UsersInfo = () => {
  return <DashboardCard label="Users registered: " data={totalUsers} />;
};

export default UsersInfo;
