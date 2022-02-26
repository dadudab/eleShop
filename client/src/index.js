import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import AuthProvider from './store/AuthProvider';
import CartProvider from './store/CartProvider';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
