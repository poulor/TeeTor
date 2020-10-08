import React, { Component } from "react";
import styles from "./css/card.module.css";


/* 
  Use Case:
<Mentee 
name = "Myles Carr" 
title = "Hamster" 
score = {451} 
subjects = {["HTML","CSS", "JS", "MEAN", "Python"]} 
url = "https://thumbs.gfycat.com/PleasedOrdinaryDeinonychus-max-1mb.gif"/> */

export default class menteeCard extends Component {
  render() {
    return (
      <div className={[styles.card, this.props.className].join(" ")}>
        <div className={[styles.activity].join(" ")}>
          <p className={styles.activityStatus}>Active</p>
          <div className={styles.statusCircle}></div>
        </div>

        <div className={[styles.profileImageBox].join(" ")}>
          <img
            className={styles.profileImg}
            src={this.props.url}
            alt="profile"
          />
        </div>

        <div className={[styles.profileCardBody].join(" ")}>
          <h className={styles.profileCardName}>{this.props.name}</h>
          <div className={styles.profileCardTitle}>{this.props.title}</div>

          <div className={styles.bulbRating}>
            <span>{this.props.score}xp</span>
          </div>

          <div className={[styles.tagSubjects].join(" ")}>
            {this.props.subjects.map((subject) => (
              <div className = {styles.sub}>{subject}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
