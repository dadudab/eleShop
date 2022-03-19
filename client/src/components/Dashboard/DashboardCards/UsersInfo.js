import { useState, useContext, useEffect } from 'react';

import AuthContext from '../../../store/auth-context';
import DashboardCard from '../../UI/DashboardCard';
import Loading from '../../UI/Loading';
import ErrorMessage from '../../UI/ErrorMessage';

const UsersInfo = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const authCtx = useContext(AuthContext);

  async function getCountedUsers() {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/user/count', {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Connot get counted users');
      }

      const data = await response.json();
      setTotalUsers(data.totalUsers);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCountedUsers();
    return () => {
      setTotalUsers(0);
    };
  }, []);

  if (isLoading) {
    return <DashboardCard data={<Loading />} />;
  }

  if (error) {
    return <DashboardCard data={<ErrorMessage>{error}</ErrorMessage>} />;
  }

  return <DashboardCard name="Users registered: " data={totalUsers} />;
};

export default UsersInfo;
