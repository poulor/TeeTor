import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import styles from './styling/Navbar.module.css';
import logo from '../../img/TeeTorLogo2.png';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i></i>{' '}
          {/* Add css class that hides the text when on a small screen */}
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i></i>{' '}
          {/* Add css class that hides the text when on a small screen */}
          <span className={styles.alt}>Sign Out</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Logo" className={styles.logo} />
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.propType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// Use mapStateToProps when we want to pull a value from the state, in this case updating auth
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Need to export connect with the component itself
// export default connect()(Navbar);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps, { logout })(Navbar);
