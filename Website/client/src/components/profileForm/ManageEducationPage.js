import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import LoadingAnim from '../layout/LoadingAnim';
import Education from './Education';


import styles from './style/profile.module.css';

const ManageEducationPage = ({ profile: { profile, loading }}) => {

  // While the component is being loaded and profile has not been updated, display the loading animation
  // Otherwise show the main content of the page
  return loading && profile == null ? <LoadingAnim /> : 
    <Fragment>
      <div className='page'>
        <h1>Manage Education Page</h1>
        <br/>
        <Education education={profile.education} />
        
        {/* Borrowed style.. please update */}
        <Link to='/AddEducation' className={styles.submit}>Add Experience</Link>
        <br/>
        <Link to='/EditProfile'>Edit Profile</Link>
      </div>
    </Fragment>
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
ManageEducationPage.propTypes = {
  profile: PropTypes.object.isRequired
};

// Use mapStateToProps when we want to pull a value from the state, in this case updating auth and the profile object
const mapStateToProps = (state) => ({
  profile: state.profile
});

// Need to export connect with the component itself
// export default connect()(Dashboard);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps, {  } )(ManageEducationPage);
