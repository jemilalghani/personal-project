import React, { Component } from "react";
import LandingCal from "../LandingCal/LandingCal";
import LandingColorTheme from "../ColorTheme/LandingColorTheme";
import ChartJS from "../ChartJS/ChartJS";
import "./LandingPage.css";
import banner from "./Repeat Grid 1.svg";
import fill from "./paint-bucket (1).svg";
import chart from "./clipboard.svg";
import chat from "./chat.svg";
import message from "./message.svg";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      color: "white"
    };
  }
  render() {
    return (
      <div className="LandingPage">
        <img className="landing-img" src={banner} alt="" />
        <div className="landing-footer">
          <div className="icon">
            <img src={fill} alt="" />
            <p>
              Fill in your personal grid once a day with a color indicative of
              your mood
            </p>
          </div>
          <div className="icon">
            <img src={chart} alt="" />
            <p>
              Check your chart to view how you tend to feel on each day of the
              week
            </p>
          </div>
          <div className="icon">
            <img src={chat} alt="" />
            <p>Write messages to yourself about anything you want</p>
          </div>
        </div>
        <div className="landing-mood">
          <p>Color Your Mood.</p>
          <div className="landing-mood-container">
            <div>
              <div className="mood-box one" />
              <p> Joyful Happy Relaxed Great Content</p>
            </div>
            <div>
              <div className="mood-box two" />
              <p> Sad Lonely Insecure Numb</p>
            </div>
          </div>
        </div>
        <div className="landing-message">
          <p>Treat Me Like A Diary.</p>
          <img
            src={message}
            alt=""
            style={{ width: "400px", marginLeft: "150px" }}
          />
        </div>
        <p className="footer-quote">"MAKING RECORDS SHOULD BE FUN."</p>
      </div>
    );
  }
}
export default LandingPage;
