import React, { Component } from "react";
import styles from "./style/stepCarousel.module.css";
import { Link, withRouter } from 'react-router-dom';

export default class stepCarousel extends Component {
  // state stores the steps. Each step includes a link and a name
  state = {
    steps: [],
  };
  componentDidMount = () => {
    let steps = this.props.steps;
    // Add a number attribute to each step (1,2,3,etc.)
    for (let i = 0; i < steps.length; i++) {
      steps[i].number = i + 1;
    }
    // Update state with props
    this.setState({
      steps: steps,
    });
  };

  render() {
    return (
      <div className = {styles.container}>
        <ul className = {styles.progressBar}>
          {this.state.steps.map((step) => (
              <li>
                <p className = {styles.step}>{step.step}</p>
              </li>
            ))}
        </ul>
         </div>
    );
  }
}
