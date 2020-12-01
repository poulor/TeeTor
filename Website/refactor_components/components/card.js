import React, { Component } from "react";
import styles from "./css/card.module.css";
import FullBulb from "./resources/fullBulb.png";
import HalfBulb from "./resources/halfBulb.png";

/* 
  Use Case:
<Card 
type = "mentee"
name = "Myles Carr" 
title = "Hamster" 
score = {451} 
subjects = {["HTML","CSS", "JS", "MEAN", "Python"]} 
url = "https://thumbs.gfycat.com/PleasedOrdinaryDeinonychus-max-1mb.gif"/> */

/* <Card 
type = "mentor"
name = "Hughie Campbell" 
title = "Sup' Killer" 
bio = "The best character in the Boys" 
url = "https://vignette.wikia.nocookie.net/p__/images/d/d8/Hughie-The-Boys.png/revision/latest?cb=20190910184751&path-prefix=protagonist" 
subjects = {["electronics", "bowling", "customer service"]}
rating = {5}/> */

// Given a rating, return the number of full light bulbs
// and half lightbulbs it represents
// Ex: 3.5 would yield 3 full and 1 half bulbs
function findBulbs (rating) {
    if (rating > 5) rating = 5
    rating = rating - rating%0.5;
    let half = 1;
    // If already whole number, no half bulbs required
    if (rating === Math.round(rating)) half = 0;
    let full = Math.floor(rating);
    let bulbs = {
        half: half,
        full: full
    }
    return bulbs;
}

export default class Card extends Component {
    state = {
        type: "",
        bulbs: [],
    }
    componentDidMount = () => {
        // When mounted, check if this is a mentor or mentee card.
        if (this.props.type == "mentor") this.setState({type:"mentor"});
        else this.setState({type:"mentee"});
        // Initialize bulbs, based on rating. Each elements
        // in bulbs is a separate image (either full or half)
        // lightbulb, that displays the user's rating out of 5. 
        // ex: a rating of 3.5 would be 3 full light bulbs and one half lightbulb
        let bulbs = findBulbs(this.props.rating);
        let comps = [];
        for(let i = 0; i < bulbs.full; i ++){
            comps.push(<img className={styles.bulb} src={FullBulb} alt = "bulbnotfound"/>)
        }
        for(let i = 0; i < bulbs.half; i ++){
            comps.push(<img className={styles.bulb} src={HalfBulb} alt = "halfbulbnotfound"/>)
        }
        this.setState({bulbs: comps});
    }
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

        {/* display content relevant to mentees */}
        {this.state.type == "mentee" && 
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
        </div>}
        {/* display content relevant to mentors */}
        {this.state.type == "mentor" && 
        <div className={[styles.profileCardBody].join(" ")}>
            <h className={styles.profileCardName}>{this.props.name}</h>
            <div className={styles.profileCardTitle}>{this.props.title}</div>

            <div className={styles.profileCardBio}>
            <span>{this.props.bio}</span>
            </div>

            <div className = {styles.bulbRating}>
            {this.state.bulbs.map((bulb) => (
                <div className = {styles.bulb}>{bulb}</div>
            ))}
            </div>

            <div className={[styles.tagSubjects].join(" ")}>
            {this.props.subjects.map((subject) => (
                <div className = {styles.sub}>{subject}</div>
            ))}
            </div>
        </div>}
      </div>
    );
  }
}
