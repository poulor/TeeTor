import React, { Fragment, useState } from 'react';
// We need this in order to use the store in a component
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Bringing in redux action
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

//
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//

//

// Bring in all actions the component will use inside an object listed as a param
// Parameters of function should contain all props used and be reflected by the prop types listed below
const Register = ({ setAlert, register, isAuthenticated }) => {
  //
  const styles = useStyles();
  //

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <div className={styles.paper}>
              <Typography component="h1" variant="h5">
                  Sign up
              </Typography>
              <form className={styles.form} noValidate>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <TextField 
                              type="name"
                              id="name"
                              placeholder="Enter Name"
                              name="name"
                              value={state.name}
                              onChange={handleChange}
                              variant="outlined"
                              required
                              fullWidth
                              label="Name"
                              autoFocus
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField 
                              type="email"
                              id="email"
                              name="email"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email"
                              value={state.email}
                              onChange={handleChange}
                              label="Email Address"
                              variant="outlined"
                              required
                              fullWidth
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                              type="password"
                              id="password"
                              placeholder="Enter Password"
                              name="password"
                              label="Password"
                              value={state.password}
                              onChange={handleChange}
                              variant="outlined"
                              required
                              fullWidth
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                              type="password"
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              label="Confirm Password"
                              name="confirm password"
                              value={state.confirmPassword}
                              onChange={handleChange}
                              variant="outlined"
                              required
                              fullWidth
                          />
                      </Grid>
                      <Button
                          type="submit"
                          className={styles.submit}
                          onClick={handleSubmitClick}
                          fullWidth
                          variant="contained"
                          color="primary"
                      >
                          Sign up
                      </Button>
                  </Grid>
              </form>
          </div>
        </Container>
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
