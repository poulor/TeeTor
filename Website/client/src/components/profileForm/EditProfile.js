import React, { Fragment} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingAnim from '../layout/LoadingAnim';
import Carousel from "./stepCarousel.js";
import EditGeneralInfoForm from './EditGeneralInfoForm';
import ManageEducationPage from './ManageEducationPage';
import ManageExperiencePage from './ManageExperiencePage';
import { Profiler } from 'react';

// import styles from './style/profile.module.css';

const EditProfile  = ({ profile: { profile, loading }}) => {

  return loading && profile == null ? <LoadingAnim /> :
    <Fragment>
      <div className='page'>
        <Carousel steps = {[
          {step : 'General Info', component:<EditGeneralInfoForm/>}, 
          {step : 'Education', component:<ManageEducationPage/>}, 
          {step : 'Experience', component:<ManageExperiencePage/>}]}>
        </Carousel> 
      </div>
    </Fragment>
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
EditProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

// Use mapStateToProps when we want to pull a value from the state, in this case updating auth and the profile object
const mapStateToProps = (state) => ({
  profile: state.profile
});

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps)(EditProfile);