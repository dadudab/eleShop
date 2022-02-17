import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="*">
          <Redirect to="/products" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
