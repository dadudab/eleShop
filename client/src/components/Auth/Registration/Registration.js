import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../../store/auth-context';
import classes from './Registration.module.css';
import RegistrationForm from './RegistrationForm';
import Loading from '../../UI/Loading';
import ErrorMessage from '../../UI/ErrorMessage';
import axios from 'axios';

const Registration = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  async function registerUser(user) {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'http://localhost:3000',
          //   'Access-Control-Allow-Methods': 'POST',
          //   'Access-Control-Allow-Headers': 'Content-Type',
          //   'Access-Control-Allow-Credentials': true,
        },
        // credentials: 'include',
        body: JSON.stringify(user),
      });

      if (!response.ok && response.status === 400) {
        throw new Error('Email already exist');
      }
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log(data);
      authCtx.login(data.token);
      setIsLoading(false);
      history.replace('/products');
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const registerUserHandler = (newUser) => {
    registerUser(newUser);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      {error && (
        <ErrorMessage className={classes.registerError}>{error}</ErrorMessage>
      )}
      <section className={classes.registration}>
        <div className={classes.registrationWrapper}>
          <h2 style={{ color: 'blue' }}>Registration</h2>
          <RegistrationForm onRegisterUser={registerUserHandler} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Registration;
