import React, { Fragment, useState } from 'react';
// We need this in order to use the store in a component
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Bringing in redux action
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

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
      setAlert('Passwords do not match', 'danger');
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
      {/* Register Form */}
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
