import React, { Component } from "react";
import Carousel from "./profileForm/stepCarousel";
import Test1 from "./test1";
import Test2 from "./test2";

export default class test extends Component {
  render() {
    return(
    <div>
      <h1>This is the testing page</h1>
      <Carousel steps = {[{step : "Profile", component:<Test1/>}, {step : "School Terms", component:<Test2/>},{step : "Course Schedule", component:<Test1/>}, {step: "Unavailability", component:<Test2/>} ]}></Carousel>
    </div>);
  }
}
