import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import AuthProvider from './store/AuthProvider';
import CartProvider from './store/CartProvider';
import UserCartProvider from './store/UserCartProvider';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <UserCartProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserCartProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
