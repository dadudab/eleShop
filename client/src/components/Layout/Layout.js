import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import Footer from './Footer';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation onCartOpen={props.onCartOpen} />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
