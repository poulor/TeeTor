import React, { Fragment, useState } from 'react';
// We need this in order to use the store in a component
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Bringing in redux action
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import styles from './style/auth.module.css';
// import Input from './input';

// Bring in all actions the component will use inside an object listed as a param
// Parameters of function should contain all props used and be reflected by the prop types listed below
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // Params as formed in alert.js from actions
      // setAlert(msg, alertType, position, timeout);
      setAlert('Passwords do not match!', 'danger');

    } else {
      register({ name, email, password });
    }
  };

  // If isAuthenticated is ever flagged True, redirect to the landing page
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className={styles.page}>
        <form 
          id="signup"
          className={styles.form} 
          onSubmit={(e) => onSubmit(e)}
        >
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>Sign Up</h1>
            <input
              className={styles.input}
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className={styles.input}
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className={styles.input}
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className={styles.input}
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
              required
            />
            <input type='submit' className={styles.submit} value='Register' />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// use mapStateToProps when we want to pull a value from the state, in this case updating isAuthenticated
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Need to export connect with the component itself
// export default connect()(Register);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps, { setAlert, register })(Register);
