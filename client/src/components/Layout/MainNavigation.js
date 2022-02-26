import { Fragment, useState, useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
import { NavLink, Link } from 'react-router-dom';
import CartButton from './CartButton';

const MainNavigation = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const sidebarToggleHandler = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebarHandler = () => {
    setIsSidebarOpen(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
    closeSidebarHandler();
  };

  const navLinksClasses = `${classes.navLinks} ${
    isSidebarOpen ? classes.navLinksOpened : ''
  }`;

  const burgerClasses = `${classes.burger} ${
    isSidebarOpen ? classes.rotateBurger : ''
  }`;

  const isUserAdmin = authCtx.isLogged && authCtx.isAdmin;

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
        <div className={classes.linksWrapper}>
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
          {isUserAdmin && (
            <li>
              <NavLink
                activeClassName={classes.navLinkActive}
                to="/dashboard"
                onClick={closeSidebarHandler}
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </div>
        <div className={classes.linksWrapper}>
          {!authCtx.isLogged && (
            <Fragment>
              <li>
                <NavLink
                  activeClassName={classes.navLinkActive}
                  to="/user/login"
                  onClick={closeSidebarHandler}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={{ color: 'blue' }}
                  activeClassName={classes.blueNavLinkActive}
                  to="/user/register"
                  onClick={closeSidebarHandler}
                >
                  Register
                </NavLink>
              </li>
            </Fragment>
          )}
          {authCtx.isLogged && (
            <li>
              <Link
                to="/products"
                style={{ color: 'blue' }}
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </li>
          )}
        </div>
      </ul>
      <CartButton onCartOpen={props.onCartOpen} />
      <div className={burgerClasses} onClick={sidebarToggleHandler}>
        <div className={classes.burgerLine}></div>
        <div className={classes.burgerLine}></div>
        <div className={classes.burgerLine}></div>
      </div>
    </header>
  );
};

export default MainNavigation;
