import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import LoadingAnim from '../layout/LoadingAnim';



const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }}) => {
  //Will call useEffect everytime Dashboard is mounted since getCurrentProfile is not a component but a function.
  // Will run continuously unless we add the brackets as second parameter
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // While the component is being loaded and profile has not been updated, display the loading animation
  // Otherwise show the main content of the page
  return loading && profile == null ? <LoadingAnim /> : 
    <Fragment>
      <div className='page'>
        <h1>Hello {user && user.name}</h1>
      </div>
      {/* <LoadingAnim /> */}
    </Fragment>
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
