import { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import LoginForm from './LoginForm';
import classes from './Login.module.css';
import AuthContext from '../../../store/auth-context';
import Loading from '../../UI/Loading';
import ErrorMessage from '../../UI/ErrorMessage';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  async function loginUser(user) {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok && response.status === 404) {
        throw new Error('Invalid email or password');
      }
      if (!response.ok && response.status === 400) {
        throw new Error('Invalid email or password');
      }
      const data = await response.json();
      authCtx.login(data.token);
      history.replace('/products');
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const loginHandler = (user) => {
    loginUser(user);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {error && (
        <ErrorMessage className={classes.loginError}>{error}</ErrorMessage>
      )}
      <section className={classes.login}>
        <div className={classes.loginWrapper}>
          <h2 style={{ color: 'blue' }}>Login</h2>
          <LoginForm onLoginUser={loginHandler} />
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
