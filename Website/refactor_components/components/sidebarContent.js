import React, { Component } from "react";
import styles from "./css/sideBar.module.css";

export default class sidebarContent extends Component {
  // Given id of content we want to make visible, make
  // other tabs invisible and make the desired content visible:
  updateVisibility = (contentId) => {
    let ids = ["classes", "friends", "chat", "calendar", "notifications"];
    for (let i = 0; i < ids.length; i++) {
      let x = document.getElementById(ids[i]);
      if (ids[i] === contentId) {
        x.className = x.className.replace(styles.hide, styles.show);
      } else {
        x.className = x.className.replace(styles.show, styles.hide);
      }
    }
  };
  render() {
    return (
      <div>
        {/* List of icons which, when clicked, display their corresponding section: */}
        <div className={styles.iconTab}>
          <i className={styles.icon} onClick={this.updateVisibility("classes")}>
            C
          </i>
          <i className={styles.icon} onClick={this.updateVisibility("friends")}>
            F
          </i>
          <i className={styles.icon} onClick={this.updateVisibility("chat")}>
            CH
          </i>
          <i
            className={styles.icon}
            onClick={this.updateVisibility("calendar")}
          >
            CA
          </i>
          <i
            className={styles.icon}
            onClick={this.updateVisibility("notifications")}
          >
            N
          </i>
        </div>

        {/* Displays the classes that the user has taken */}
        <ul
          id="classes"
          className={[styles.userClasses, styles.userTabs, styles.show].join(
            " "
          )}
        >
          <li className={styles.userClassesHeader}>Classes</li>
          <li>Computer Science I</li>
          <li>Introduction to Algorithms</li>
        </ul>
         {/* Displays the users friends */}
        <ul id="friends" className={[styles.userTabs, styles.hide].join(" ")}>
          <li className={styles.userClassesHeader}>Friends</li>
        </ul>
        {/* Displays the chat */}
        <ul id="chat" className={[styles.userChat, styles.hide].join(" ")}>
          <li className={styles.userClassesHeader}>Chat</li>
        </ul>
        {/* Calendar section */}
        <ul
          id="calendar"
          className={[styles.userCalendar, styles.hide].join(" ")}
        >
          <li className={styles.userClassesHeader}>Calendar</li>
        </ul>
        {/* Displays the user's notifications */}
        <ul
          id="notifications"
          className={[styles.userNotifications, styles.hide].join(" ")}
        >
          <li className={styles.userClassesHeader}>Notifications</li>
        </ul>
      </div>
    );
  }
}
