import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import Footer from './Footer';

import classes from './Layout.module.css';

const Layout = (props) => {

  const storeCartHandler = () => {
    props.passCart();
  };

  return (
    <Fragment>
      <MainNavigation onCartOpen={props.onCartOpen} />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
