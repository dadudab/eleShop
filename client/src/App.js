import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProductListPage from './pages/ProductListPage';
import AboutPage from './pages/AboutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/products" exact>
          <ProductListPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/products/:productId">
          <ProductDetailsPage />
        </Route>
        <Route path="*">
          <Redirect to="/products" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
