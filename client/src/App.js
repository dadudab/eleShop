import { useState, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProductListPage from './pages/ProductListPage';
import AboutPage from './pages/AboutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Cart from './components/Cart/Cart';
import DashboardPage from './pages/DashboardPage';
import AuthContext from './store/auth-context';
import NewProductPage from './pages/NewProductPage';
import UpdateProductPage from './pages/UpdateProductPage';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const openCartHandler = () => {
    setIsCartOpen(true);
    console.log('open cart');
  };

  const closeCartHandler = () => {
    setIsCartOpen(false);
    console.log('close cart');
  };

  const isUserAdmin = authCtx.isLogged && authCtx.isAdmin;

  return (
    <Layout onCartOpen={openCartHandler}>
      {isCartOpen && <Cart onCloseCart={closeCartHandler} />}
      <Switch>
        <Route path="/products" exact>
          <ProductListPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        {isUserAdmin && (
          <Route path="/dashboard/products/new">
            <NewProductPage />
          </Route>
        )}
        {isUserAdmin && (
          <Route path="/dashboard/products/:productId/update">
            <UpdateProductPage />
          </Route>
        )}
        <Route path="/products/:productId">
          <ProductDetailsPage />
        </Route>
        <Route path="/user/login">
          <LoginPage />
        </Route>
        <Route path="/user/register">
          <RegistrationPage />
        </Route>
        {isUserAdmin && (
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
        )}
        <Route path="/checkout">
          <CheckoutPage />
        </Route>
        <Route path="*">
          <Redirect to="/products" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
