import React, { Component } from "react";
import styles from "./style/input.module.css";

export default class input extends Component {
  render() {
    return (
      <div>
        <div className={styles.wrapper}>
          <input
            className={[this.props.className, styles.input].join(" ")}
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
          ></input>
          <p className={styles.placeholder}>{this.props.placeholder}</p>
        </div>
      </div>
    );
  }
}
