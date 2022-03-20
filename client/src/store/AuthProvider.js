import { useReducer, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './auth-context';

const initialAuthState = {
  token: '',
  isLogged: false,
  isAdmin: false,
};

const authReducer = (state, action) => {
  if (action.type === 'LOGIN_USER') {
    const decodedToken = jwtDecode(action.token);
    localStorage.setItem('token', action.token);
    const tokenExpiration = Date.now() + 3540000;
    localStorage.setItem('tokenExpiration', tokenExpiration);
    return {
      token: action.token,
      isLogged: true,
      isAdmin: decodedToken.isAdmin,
    };
  }
  if (action.type === 'CHECK_AUTH') {
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      const decodedToken = jwtDecode(existingToken);
      return {
        token: existingToken,
        isLogged: true,
        isAdmin: decodedToken.isAdmin,
      };
    }
    return initialAuthState;
  }
  if (action.type === 'LOGOUT_USER') {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    return {
      token: '',
      isLogged: false,
      isAdmin: false,
    };
  }

  return { token: '', isLogged: false, isAdmin: false };
};

const AuthProvider = (props) => {
  const [authState, dispatchAuth] = useReducer(authReducer, initialAuthState);

  const loginUserHandler = (token) => {
    dispatchAuth({ type: 'LOGIN_USER', token });
  };

  const logoutUserHandler = () => {
    dispatchAuth({ type: 'LOGOUT_USER' });
  };

  useEffect(() => {
    dispatchAuth({ type: 'CHECK_AUTH' });
  }, []);

  useEffect(() => {
    if (authState.isLogged) {
      if (+localStorage.getItem('tokenExpiration') > Date.now()) {
        const tokenRemainingTime =
          +localStorage.getItem('tokenExpiration') - Date.now();
        setTimeout(() => {
          console.log('auto logout');
          dispatchAuth({ type: 'LOGOUT_USER' });
        }, tokenRemainingTime);
      } else if (+localStorage.getItem('tokenExpiration') < Date.now()) {
        console.log('initial logout');
        dispatchAuth({ type: 'LOGOUT_USER' });
      }
    }
  }, [authState]);

  console.log(authState);

  const authContext = {
    token: authState.token,
    isLogged: authState.isLogged,
    isAdmin: authState.isAdmin,
    login: loginUserHandler,
    logout: logoutUserHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
