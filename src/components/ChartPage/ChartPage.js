import React, { Component } from "react";
import Calendar from "../Calendar/Calendar";
import ColorTheme from "../ColorTheme/ColorTheme";
import "./ChartPage.css";
import { connect } from "react-redux";
import UserChartJS from "../UserChartJS/UserChartJS";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
  }
  toggle = () => {
    this.setState(prevState => {
      return { toggle: !prevState.toggle };
    });
  };
  render() {
    return (
      <div className="chartPage">
        {this.props.user ? <Calendar /> : ""}
        <ColorTheme />
        {this.state.toggle ? (
          <UserChartJS user={this.props.user} />
        ) : (
          <div className="chartbutton" onClick={this.toggle}>
            view personal chart.
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(Chart);
