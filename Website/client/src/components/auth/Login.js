import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

//
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//


// Parameters of function should contain all props used and be reflected by the prop types listed below
const Login = ({ login, isAuthenticated }) => {
  //
  const styles = useStyles();
  //

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
      {/* Login form */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <form className={styles.form} noValidate>
                <TextField 
                    type="email"
                    name="email"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    value={state.email}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    label="Email Address"
                    required
                    fullWidth
                    autoFocus
                />
                <TextField 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    value={state.password}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    required
                    fullWidth
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                    onClick={handleSubmitClick}
                >
                    Login
                </Button>
            </form>
        </div>
      </Container>
      {/* Login form */}
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
