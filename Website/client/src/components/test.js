import React, { Component } from "react";
import Carousel from "./profileForm/stepCarousel";

export default class test extends Component {
  render() {
    return(
    <div>
      <h1>This is the testing page</h1>
      <Carousel steps = {[{link : "link1", step : "Profile"}, {link : "link2", step : "School Terms"},{link : "link3", step : "Course Schedule"} ]}></Carousel>
    </div>);
  }
}
