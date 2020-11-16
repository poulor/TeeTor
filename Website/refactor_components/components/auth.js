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
    // If login:
    if (this.state.login) {
      console.log("Signin:");
      console.log(
        "This is the username that was submitted: " + this.state.username
      );
      console.log(
        "This is the password that was submitted: " + this.state.password
      );
    }
    // If signup:
    else {
      console.log("This is the name: " + this.state.name);
      console.log("This is the email: " + this.state.email);
      console.log("This is the username: " + this.state.username);
      console.log("This is the password1: " + this.state.password1);
      console.log("This is the password2: " + this.state.password2);
    }
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
  switchContexts = () => {
    var login = document.getElementById("login");
    var signup = document.getElementById("signup");
    if (this.state.login) {
      login.className = login.className.replace(styles.show, styles.hide);
      signup.className = signup.className.replace(styles.hide, styles.show);
      this.setState({ login: false });
    } else {
      login.className = login.className.replace(styles.hide, styles.show);
      signup.className = signup.className.replace(styles.show, styles.hide);
      this.setState({ login: true });
    }
  };
  render() {
    return (
      <div className={styles.page}>
        <form
          id="login"
          onSubmit={this.onSubmit}
          className={[styles.form, styles.show].join(" ")}
        >
          <p className={styles.label}>Enter Username:</p>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="TeetorUser423"
            onChange={this.onChange}
            className={styles.input}
          />
          <p className={styles.label}>Enter Password:</p>

          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            className={styles.input}
          />
          <button
            type="submit"
            onClick={this.onSubmit}
            className={styles.submit}
          >
            Submit
          </button>
        </form>
        <form
          id="signup"
          onSubmit={this.onSubmit}
          className={[styles.form, styles.hide].join(" ")}
        >
          <p className={styles.label}>Enter Name:</p>

          <input
            type="text"
            name="name"
            placeholder="George Washington"
            value={this.state.name}
            onChange={this.onChange}
            className={styles.input}
          />
          <p className={styles.label}>Enter email:</p>

          <input
            type="text"
            name="email"
            placeholder="foundingfather@gmail.com"
            value={this.state.email}
            onChange={this.onChange}
            className={styles.input}
          />
          <p className={styles.label}>Enter Username:</p>

          <input
            type="text"
            name="username"
            placeholder="washingtong@gmail.com"
            value={this.state.username}
            onChange={this.onChange}
            className={styles.input}
          />
          <p className={styles.label}>Enter password:</p>

          <input
            type="password"
            name="password1"
            value={this.state.password1}
            onChange={this.onChange}
            className={styles.input}
          />
          <p className={styles.label}>Confirm password:</p>

          <input
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
            className={styles.input}
          />
          <button
            type="submit"
            onClick={this.onSubmit}
            className={styles.submit}
          >
            Submit
          </button>
        </form>
        {/* When this button is clicked, switch from login to signup or from signup to login */}
        <button className = {styles.switch} onClick={this.switchContexts}>Switch</button>
      </div>
    );
  }
}
