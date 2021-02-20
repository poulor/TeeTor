import React, { Component } from "react";
import styles from "./style/stepCarousel.module.css";

export default class stepCarousel extends Component {
  state = {
    steps: [],
  };
  componentDidMount = () => {
    let steps = this.props.steps;
    // Add a number attribute to each step (1,2,3,etc.)
    for (let i = 0;i < steps.length; i ++){
        steps[i].number = i + 1;
    }
    // Update state with props
    this.setState({
      steps: steps,
    });
  };

  render() {
    return (
      <div className={styles.body}>
        {this.state.steps.map((step) => (
          <div key={step.link}>
            <div className = {styles.circle}>
                {step.number}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
