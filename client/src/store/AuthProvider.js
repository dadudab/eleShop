import { useReducer, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './auth-context';
import CartContext from './cart-context';

const initialAuthState = {
  token: '',
  isLogged: false,
  isAdmin: false,
};

const authReducer = (state, action) => {
  if (action.type === 'LOGIN_USER') {
    const decodedToken = jwtDecode(action.token);
    localStorage.setItem('token', action.token);
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
  const cartCtx = useContext(CartContext);

  const loginUserHandler = (token) => {
    dispatchAuth({ type: 'LOGIN_USER', token });
    cartCtx.getUserCart();
  };

  const logoutUserHandler = () => {
    dispatchAuth({ type: 'LOGOUT_USER' });
  };

  useEffect(() => {
    dispatchAuth({ type: 'CHECK_AUTH' });
  }, []);

  const authContext = {
    token: authState.token,
    isLogged: authState.isLogged,
    isAdmin: authState.isAdmin,
    login: loginUserHandler,
    logout: logoutUserHandler,
  };

  console.log(authState);

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
