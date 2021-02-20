import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SideBar from './components/layout/sideBar/SideBar'; 
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import EditProfileForm from './components/profileForm/EditProfileForm';
import PrivateRoute from './components/routing/PrivateRoute';
import Test from './components/test.js';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Will call useEffect everytime App is mounted since loadUser is a function not a component.
  // Will run continuously unless we add the brackets as second parameter
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <PrivateRoute component={SideBar} />
            <Switch>
              <Route exact path = '/test' component = {Test}/>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Test} />
              <PrivateRoute exact path='/Dashboard' component={Dashboard} />
              <PrivateRoute exact path='/EditProfile' component={EditProfileForm} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
