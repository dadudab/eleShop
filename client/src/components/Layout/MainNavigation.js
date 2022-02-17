import { Fragment } from 'react';
import { useState } from 'react';

import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarToggleHandler = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebarHandler = () => {
    setIsSidebarOpen(false);
  };

  const navLinksClasses = `${classes.navLinks} ${
    isSidebarOpen ? classes.navLinksOpened : ''
  }`;

  const burgerClasses = `${classes.burger} ${
    isSidebarOpen ? classes.rotateBurger : ''
  }`;

  const logo = (
    <Fragment>
      <span style={{ color: 'blue' }}>Ele</span>
      <span>Shop</span>
    </Fragment>
  );
  return (
    <header>
      <div className={classes.logo}>{logo}</div>
      <ul className={navLinksClasses}>
        <li>
          <NavLink
            activeClassName={classes.navLinkActive}
            to="/products"
            onClick={closeSidebarHandler}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={classes.navLinkActive}
            to="/about"
            onClick={closeSidebarHandler}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register" style={{ color: 'blue' }}>
            Register
          </NavLink>
        </li>
      </ul>
      <div className={burgerClasses} onClick={sidebarToggleHandler}>
        <div className={classes.burgerLine}></div>
        <div className={classes.burgerLine}></div>
        <div className={classes.burgerLine}></div>
      </div>
    </header>
  );
};

export default MainNavigation;
