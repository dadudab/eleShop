import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProductListPage from './pages/ProductListPage';
import AboutPage from './pages/AboutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Cart from './components/Cart/Cart';

const App = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [testCart, setTestCart] = useState({});

  const openCartHandler = () => {
    setIsCartOpen(true);
    console.log('open cart');
  };

  const closeCartHandler = () => {
    setIsCartOpen(false);
    console.log('close cart');
  };

  return (
    <Layout onCartOpen={openCartHandler}>
      {isCartOpen && <Cart onCloseCart={closeCartHandler} />}
      <Switch>
        <Route path="/products" exact>
          <ProductListPage/>
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/products/:productId">
          <ProductDetailsPage />
        </Route>
        <Route path="/user/login">
          <LoginPage />
        </Route>
        <Route path="/user/register">
          <RegistrationPage />
        </Route>
        <Route path="*">
          <Redirect to="/products" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
