import React, {  } from 'react';
import PropTypes from 'prop-types';

import {changeMentee, changeMentor } from '../../../actions/profile_type';
import {useDispatch, useSelector} from 'react-redux';

import styles from './style/userTypeSwitch.module.css';

const UserTypeSwitch = (props) => {
   // Get sidebar type from global state:
   var sidebarType = useSelector(state => state.profileType);
   const dispatch = useDispatch();

   var sliderLeft;
   
   // if user is only a mentee, display mentee side of type switch
   if (props.teetorType === 1){
    sliderLeft = true;
    dispatch(changeMentee());
   }
   // if user is only a mentor, display mentor side of type switch
   else if (props.teetorType === 2) {
    sliderLeft = false;
    dispatch(changeMentor());
   } 
   // is uer is mentor and mentee, display whatever they have their
   // content set to:
   else if (props.teetorType === 3){
     sliderLeft = (sidebarType === 'mentee');
   }
   // if null, default to mentee:
   else{
     sliderLeft = true;
     dispatch(changeMentee());
   }
   

  //Foo
  //Check if teetorType is 1/2/3
  //If 3
    //Unlock sidebar
  //If 1, 
    //set sidebarType === "mentee"
    //make sure toggle is set to mentee
    //Lock switch
  //If 2, 
    //set sidebarType === "mentor"
    //make sure toggle is set to mentor
    //Lock switch




  // When user clicks the button to switch contexts, the slider is adjusted:
  const typeSwitch = () => {
    // If user has not specifically set both mentor/mentee, they cannot switch
    if (props.teetorType !== 3){
      return;
    }
    if (sidebarType === 'mentee') {
      dispatch(changeMentor())
    }
    else if (sidebarType === 'mentor'){
      dispatch(changeMentee())
    }
    // toggleTeeTorType(); 
    // Toggle slider position:
    var x = document.getElementById('typeSwitch');
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
    } else {
      // Switch which text is active:
      z.className = styles.switchTextInactive;
      y.className = styles.switchTextActive;
    }
  };

  return (
      <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
              <div>
                  {/* <div onClick={this.typeSwitch} className={styles.switch}> */}
                  <div onClick={typeSwitch} className={styles.switch}>
                  <div id="typeSwitch" className={sliderLeft ? styles.switchSliderLeft : styles.switchSliderRight}></div>
                  <div className={[styles.switchText,styles.switchTextLeft].join(" ")}>
                      <p id="switchTextLeft" className={sliderLeft ? styles.switchTextActive : styles.switchTextInactive}>
                      Mentee
                      </p>
                  </div>
                  <div className={[styles.switchText,styles.switchTextRight].join(" ")}>
                      <p id="switchTextRight" className={sliderLeft ? styles.switchTextInactive : styles.switchTextActive}>
                      Mentor
                      </p>
                  </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

UserTypeSwitch.propType = {
  toggleTeeTorType: PropTypes.func.isRequired,
  teetorType: PropTypes.object.isRequired,
};

// export default connect(mapStateToProps, { toggleTeeTorType })(UserTypeSwitch);
export default UserTypeSwitch;

