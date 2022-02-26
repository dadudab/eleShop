import React from 'react';

const AuthContext = React.createContext({
  token: '',
  isLogged: false,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;
