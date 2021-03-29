import React, { useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from "./style/sideBar.module.css";
import UserTypeSwitch from "./userTypeSwitch";
import { getCurrentProfile } from '../../../actions/profile';
import Card from '../../profileForm/myCard';

import LoadingAnim from '../LoadingAnim';

// import Mentor from "./mentorCard.js";

const SideBar = ({ getCurrentProfile, auth: { user, isAuthenticated }, profile: { profile, loading, skills, languages}}) => {

  //Will call useEffect everytime Dashboard is mounted since getCurrentProfile is not a component but a function.
  // Will run continuously unless we add the brackets as second parameter
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, isAuthenticated, loading]);

  const slideIn = () => {
    var x = document.getElementById("slider");
    if (x.className === styles.slideOut) {
      var y = document.getElementsByClassName("page");
      [...y].forEach( x => x.className = "pageExpand" );
      x.className = styles.slideIn;
    }
    else {
      x.className = styles.slideOut;
      var z = document.getElementsByClassName("pageExpand");
      [...z].forEach( x => x.className = "page" );
    }
  };



  return (
    <div id="slider" className={styles.slideOut}>
      <div id="slideOutTab" className={styles.slideOutTab} onClick={slideIn}>
        <div className={styles.slideButton} onClick={slideIn}>
          <p onClick={slideIn}> Profile </p>
        </div>
      </div>
      <UserTypeSwitch teetorType = {profile && profile.teetorType}/>
      {profile !== null ? (
        <Fragment>
          <p>Profile Exists</p>
        </Fragment>
      ) : (
        <Fragment>
          <p>Profile Does Not Exist</p>
          <Link to='/createProfile'>Create Profile</Link>
        </Fragment>
      )}

    {profile === null && loading && <LoadingAnim/>}
    {profile !== null && !loading && <Card type = "mentee"
      //Why is this?
      name = {user && user.name} 
      title = "Hamster" 
      score = {451} 
      // skills = {["math","history"]}
      skills = {profile.skills} 
      url = "https://thumbs.gfycat.com/PleasedOrdinaryDeinonychus-max-1mb.gif"/>}
   
    

{/* {profile && profile.skills[0]}  */}
      {/* <div className={styles.modalBody}>
        <Mentor
          className={styles.card}
          name="Hughie Campbell"
          title="The Boys"
          bio="The best character in the Boys"
          url="https://vignette.wikia.nocookie.net/p__/images/d/d8/Hughie-The-Boys.png/revision/latest?cb=20190910184751&path-prefix=protagonist"
          subjects={["electronics", "bowling", "customer service"]}
          rating={5}
        />
      </div>
      <p>State: {this.state.status}</p> */}
    </div>
  )
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
SideBar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

// Use mapStateToProps when we want to pull a value from the state, in this case updating auth and the profile object
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

// Need to export connect with the component itself
// export default connect()(SideBar);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps, { getCurrentProfile } )(SideBar);
