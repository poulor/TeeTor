import React, { Component } from "react";
import styles from "./css/sideBar.module.css";
import Mentor from "./mentorCard.js";

export default class sideBar extends Component {
  state = {
      status: "mentor"
  };
  // Slides the sidebar in/out:
  slideIn = () => {
    var x = document.getElementById("slider");
    if (x.className === styles.slideOut) x.className = styles.slideIn;
    else x.className = styles.slideOut;
  };

  // When user clicks the button to switch contexts, the slider is adjusted:
  typeSwitch = () => {
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
      this.setState({status : "mentee"});
    } else {
      // Switch which text is active:
      z.className = styles.switchTextInactive;
      y.className = styles.switchTextActive;
      // Update: state:
      this.setState({status : "mentor"});
    }
  };
  render() {
    return (
      <div id="slider" className={styles.slideOut}>
        <div id="slideOutTab" className={styles.slideOutTab}>
          <div className={styles.slideButton} onClick={this.slideIn}>
            <p> Profile </p>
          </div>
        </div>
        <div class={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div>
              <div onClick={this.typeSwitch} className={styles.switch}>
                <div id="typeSwitch" className={styles.switchSliderLeft}></div>
                <div className={styles.switchTextLeft}>
                  <p id="switchTextLeft" className={styles.switchTextActive}>
                    Mentor
                  </p>
                </div>
                <div className={styles.switchTextRight}>
                  <p id="switchTextRight" className={styles.switchTextInactive}>
                    Mentee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalBody}>
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
        <p>State: {this.state.status}</p>
      </div>
    );
  }
}
