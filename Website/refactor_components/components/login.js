import React, { Component } from "react";
import styles from "./css/auth.module.css";

export default class auth extends Component {
  // State holds the values that the user submits in these forms:
  state = {
    username: "",
    password: "",
    password1: "",
    password2: "",
    email: "",
    name: "",
    login: true,
  };
  // For now, when we submit, print out the values that were submitted:
  onSubmit = (e) => {
    e.preventDefault();
    console.log(
      "This is the username that was submitted: " + this.state.username
    );
    console.log(
      "This is the password that was submitted: " + this.state.password
    );

    this.setState({ username: "" });
    this.setState({ password: "" });
    this.setState({ password1: "" });
    this.setState({ password2: "" });
    this.setState({ email: "" });
    this.setState({ name: "" });
  };
  // On change, take the values form the form and
  // update the state of the component:
  onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  // when we switch contexts, first check the state which
  // tells us whether we are on signup or login and switch
  // accordingly:
  render() {
    return (
      <div className={styles.page}>
        <form
          id="login"
          onSubmit={this.onSubmit}
          className={[styles.form].join(" ")}
        >
          <div className={[styles.formWrapper,styles.formWrapperLogin].join(" ")}>
          <h1 className={styles.title}>Log In</h1>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username *"
              onChange={this.onChange}
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={this.state.password}
              onChange={this.onChange}
              className={styles.input}
            />
            <button
              type="submit"
              onClick={this.onSubmit}
              className={styles.submit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
