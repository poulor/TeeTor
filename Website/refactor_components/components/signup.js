import React, { Component } from "react";
import styles from "./css/auth.module.css";

export default class auth extends Component {
  // State holds the values that the user submits in these forms:
  state = {
    username: "",
    password1: "",
    password2: "",
    email: "",
    name: "",
    login: true,
  };
  // For now, when we submit, print out the values that were submitted:
  onSubmit = (e) => {
    e.preventDefault();

    console.log("This is the name: " + this.state.name);
    console.log("This is the email: " + this.state.email);
    console.log("This is the username: " + this.state.username);
    console.log("This is the password1: " + this.state.password1);
    console.log("This is the password2: " + this.state.password2);

    this.setState({ username: "" });
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

  render() {
    return (
      <div className={styles.page}>
        <form
          id="signup"
          onSubmit={this.onSubmit}
          className={[styles.form].join(" ")}
        >
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>Sign Up</h1>
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={this.state.name}
              onChange={this.onChange}
              className={styles.input}
            />
            <input
              type="text"
              name="Email"
              placeholder="Email *"
              value={this.state.email}
              onChange={this.onChange}
              className={styles.input}
            />

            <input
              type="text"
              name="Username"
              placeholder="Username *"
              value={this.state.username}
              onChange={this.onChange}
              className={styles.input}
            />

            <input
              type="password"
              name="password1"
              placeholder="Password *"
              value={this.state.password1}
              onChange={this.onChange}
              className={styles.input}
            />

            <input
              type="password"
              name="password2"
              placeholder="Confirm password *"
              value={this.state.password2}
              onChange={this.onChange}
              className={styles.input}
            />
            <button
              type="submit"
              onClick={this.onSubmit}
              className={styles.submit}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
