import React, { Component } from "react";
import styles from "./style/sideBar.module.css";
import UserTypeSwitch from "./userTypeSwitch";

// import Mentor from "./mentorCard.js";

export default class sideBar extends Component {

  slideIn = () => {
    var x = document.getElementById("slider");
    if (x.className === styles.slideOut) {
      var y = document.getElementsByClassName("page");
      [...y].forEach( x => x.className = "pageExpand" );
      // [...y].forEach( x => x.classList.remove("page") );
      x.className = styles.slideIn;
    }
    else {
      x.className = styles.slideOut;
      var y = document.getElementsByClassName("pageExpand");
      [...y].forEach( x => x.className = "page" );
      // [...y].forEach( x => x.classList.remove("pageExpand") );
    }
  };

  render() {
    return (
      <div id="slider" className={styles.slideOut}>
        <div id="slideOutTab" className={styles.slideOutTab} onClick={this.slideIn}>
          <div className={styles.slideButton} onClick={this.slideIn}>
            <p onClick={this.slideIn}> Profile </p>
          </div>
        </div>
        <UserTypeSwitch />

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
    );
  }
}
