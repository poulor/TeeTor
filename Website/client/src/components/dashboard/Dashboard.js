import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
// import SideBar from '../layout/SideBar';



const Dashboard = ({ getCurrentProfile, auth, profile}) => {
  //Will call useEffect everytime Dashboard is mounted since getCurrentProfile is not a component but a function.
  // Will run continuously unless we add the brackets as second parameter
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    // <SideBar />
    // <h1>Hello ({name})</h1>
    <h1>Hello World`</h1>
  )
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  // userName: PropTypes.string
};

// Use mapStateToProps when we want to pull a value from the state, in this case updating auth and the profile object
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  // userName: state.auth.user || 'Ahsan',
});

// Need to export connect with the component itself
// export default connect()(Dashboard);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps, { getCurrentProfile } )(Dashboard);
