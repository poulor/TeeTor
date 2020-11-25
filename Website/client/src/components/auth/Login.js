import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import styles from './style/auth.module.css';
import Input from './input';

// Parameters of function should contain all props used and be reflected by the prop types listed below
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // If isAuthenticated is ever flagged True, redirect to the landing page
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className={styles.page}>
        <form 
          id="login" 
          onSubmit={(e) => onSubmit(e)} 
          className={[styles.form].join(" ")}
        >
          <div className={[styles.formWrapper,styles.formWrapperLogin].join(" ")}>
            <h1 className={styles.title}>Log In</h1>
            <div className='form-group'>
              <Input
                className={styles.input}
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <Input
                className={styles.input}
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={(e) => onChange(e)}
                required
                />
            </div>
            <input type='submit' className={styles.submit} value='Login' />
          </div>
        </form>
      </div>
  </Fragment>
  );
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// use mapStateToProps when we want to pull a value from the state, in this case updating isAuthenticated
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Need to export connect with the component itself
// export default connect()(Login);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps, { login })(Login);
