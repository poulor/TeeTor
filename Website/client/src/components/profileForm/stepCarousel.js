import { ContextHandlerImpl } from "express-validator/src/chain";
import React, { Component } from "react";
import styles from "./style/stepCarousel.module.css";

// The way this component works is we pass in a list of objects. 
// Each object contains a name (passed in as 'step') and content
// that we want to display when we click on that step (passed in as
// 'component'). 
// Use case (With 2 steps):
{/* <Carousel steps = {[{step : "Profile", component:<Test1/>}, {step : "School Terms", component:<Test2/>}]}></Carousel> */}
// The component renders the steps by mapping the state to a 
// carousel display and updating the state when a new step is clicked
// so that that step can be displayed:
export default class stepCarousel extends Component {
  // state stores the steps. Each step includes a link and a name
  state = {
    steps: [],
    currentStep: 1,
    currentComponent: null,
  };
  componentDidMount = () => {
    let steps = this.props.steps;
    // Add a number attribute to each step (1,2,3,etc.)
    // This will be used as a key as well as allow us to 
    // display the number in the circle
    for (let i = 0; i < steps.length; i++) {
      steps[i].key = i + 1;
    }
    // Update state with props
    this.setState({
      steps: steps,
    });
    // update state with the current component that we want to display:
    this.setState({
      currentComponent: steps[this.state.currentStep - 1].component,
    });
  };

  // when we click on a new step, we want to update which content is being
  // displayed:
  updateStep = (stepNum) => {
    // update state value of which step we are showing:
    this.setState({ currentStep:stepNum });
    // updates the component attribute in state:
    this.setState({
      currentComponent: this.state.steps[stepNum - 1].component,
    });
  };
  render() {
    return (
      <div className={styles.container}>
        <ul className={styles.progressBar}>
          {this.state.steps.map((step) => (
            <li onClick={this.updateStep.bind(this,step.key)}>
              <p className={styles.step}>{step.step}</p>
            </li>
          ))}
        </ul>
        <div>{this.state.currentComponent}</div>
      </div>
    );
  }
}
