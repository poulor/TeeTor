import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import LoadingAnim from '../layout/LoadingAnim';
import Experience from './ExperienceDisplay';
import AddExperience from './AddExperienceForm'

import styles from './style/profile.module.css';

const ManageExperiencePage = ({ profile: { profile, loading }}) => {
  const [form, toggleForm] = useState(false);

  const onToggle = () => {
    toggleForm(!form);
  }

  // While the component is being loaded and profile has not been updated, display the loading animation
  // Otherwise show the main content of the page
  return loading && profile == null ? <LoadingAnim /> : 
    <Fragment>
      <div>
        <h1>Manage Experience Page</h1>
        {!form && <Experience experience={profile.experience} onToggle = {onToggle}/>}
        <br/>
        
        {/* Borrowed style.. please update */}

        {form && <AddExperience onToggle = {onToggle}/>}
        <br/>
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
