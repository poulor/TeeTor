import React, { Component } from "react";
import styles from "./style/sideBar.module.css";

export default class userTypeSwitch extends Component {
  state = {
      status: "mentor"
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
    );
  }
}
