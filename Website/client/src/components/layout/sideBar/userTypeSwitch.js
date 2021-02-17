import React, {  } from "react";
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

//TODO:
// Change to profile type
// change types.js to action names

import {changeMentee, changeMentor } from '../../../actions/profile_type';
import {useDispatch, useSelector} from 'react-redux';

import styles from "./style/userTypeSwitch.module.css";
// import { toggleTeeTorType } from '../../../actions/profile';

const UserTypeSwitch = () => {
  // state = {
  //     status: "mentee"
  // };

  // Get sidebar type from global state:
  const sidebarType = useSelector(state => state.profileType)
  const dispatch = useDispatch();

  // When user clicks the button to switch contexts, the slider is adjusted:
  const typeSwitch = () => {
    if (sidebarType == "mentee") {
      dispatch(changeMentor())
    }
    else if (sidebarType == "mentor"){
      dispatch(changeMentee())
    }
    // toggleTeeTorType(); 
    // Toggle slider position:
    var x = document.getElementById("typeSwitch");
    // First determine what state the slider is already in:
    if (x.className === styles.switchSliderLeft)
    // Then switch:
      x.className = styles.switchSliderRight;
    else x.className = styles.switchSliderLeft;
    // Update text color:
    var y = document.getElementById("switchTextLeft");
    var z = document.getElementById("switchTextRight");
    if (y.className === styles.switchTextActive) {
      // switch which text is active:
      y.className = styles.switchTextInactive;
      z.className = styles.switchTextActive;
      // Update state:
      // this.setState({status : "mentor"});
    } else {
      // Switch which text is active:
      z.className = styles.switchTextInactive;
      y.className = styles.switchTextActive;
      // Update: state:
      // this.setState({status : "mentee"});
    }
  };

  return (
      <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
              <div>
                  {/* <div onClick={this.typeSwitch} className={styles.switch}> */}
                  <div onClick={typeSwitch} className={styles.switch}>
                  <div id="typeSwitch" className={styles.switchSliderLeft}></div>
                  <div className={styles.switchTextLeft}>
                      <p id="switchTextLeft" className={styles.switchTextActive}>
                      Mentee
                      </p>
                  </div>
                  <div className={styles.switchTextRight}>
                      <p id="switchTextRight" className={styles.switchTextInactive}>
                      Mentor
                      </p>
                  </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

// UserTypeSwitch.propType = {
//   toggleTeeTorType: PropTypes.func.isRequired,
//   // auth: PropTypes.object.isRequired,
// };

// // Use mapStateToProps when we want to pull a value from the state, in this case updating auth
// const mapStateToProps = (state) => ({
//   // auth: state.auth,
// });

// export default connect(mapStateToProps, { toggleTeeTorType })(UserTypeSwitch);
export default connect()(UserTypeSwitch);

