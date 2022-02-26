import { useState } from 'react';

import Input from '../../UI/Input';
import Button from '../../UI/Button';
import classes from './LoginForm.module.css';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    props.onLoginUser(userData);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        name="email"
        label="Email address"
        placeholder="email"
        value={email}
        onChange={emailChangeHandler}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="password"
        value={password}
        onChange={passwordChangeHandler}
      />
      <div className={classes.actions}>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default LoginForm;
