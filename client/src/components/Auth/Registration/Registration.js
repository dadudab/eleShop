import { useState } from 'react';

import classes from './Registration.module.css';
import RegistrationForm from './RegistrationForm';
import Loading from '../../UI/Loading';
import ErrorMessage from '../../UI/ErrorMessage';

const Registration = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerUser(user) {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Something went wrong...');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error('Cannot register user...');
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  const registerUserHandler = (newUser) => {
    registerUser(newUser);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <section className={classes.registration}>
      <div className={classes.registrationWrapper}>
        <h2 style={{ color: 'blue' }}>Registration</h2>
        <RegistrationForm onRegisterUser={registerUserHandler} />
      </div>
    </section>
  );
};

export default Registration;
