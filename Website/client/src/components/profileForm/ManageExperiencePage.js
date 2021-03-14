import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import LoadingAnim from '../layout/LoadingAnim';
import Experience from './Experience';

import styles from './style/profile.module.css';

const ManageExperiencePage = ({ profile: { profile, loading }}) => {

  // While the component is being loaded and profile has not been updated, display the loading animation
  // Otherwise show the main content of the page
  return loading && profile == null ? <LoadingAnim /> : 
    <Fragment>
      <div className='page'>
        <h1>Manage Experience Page</h1>
        <Experience experience={profile.experience} />
        <br/>
        
        {/* Borrowed style.. please update */}
        <Link to='/AddExperience' className={styles.submit}>Add Experience</Link>
        <br/>
        <Link to='/ManageEducation'>Manage Education</Link>
      </div>
    </Fragment>
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
ManageExperiencePage.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Use mapStateToProps when we want to pull a value from the state, in this case updating auth and the profile object
const mapStateToProps = (state) => ({
  profile: state.profile
});


// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps, {  } )(ManageExperiencePage);
