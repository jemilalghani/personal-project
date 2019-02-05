import React, { Component } from "react";
import { connect } from "react-redux";
import { changeColor } from "../../ducks/reducer";
import moment from "moment";
import axios from "axios";
import "./ColorTheme.css";
import arrow from "./right-arrow (1).svg";

class ColorTheme extends Component {
  constructor() {
    super();
    this.state = {
      toggle1: false,
      toggle2: false,
      toggle3: false,
      toggle4: false,
      toggle5: false,
      toggle6: false,
      buttonOn: true,
      duplicatedEntry: false,
      posting: false
    };
    this.disable = this.disable.bind(this);
    this.time = this.time.bind(this);
    this.timeTwo = this.timeTwo.bind(this);
  }
  toggle1 = () => {
    this.setState(prevState => {
      return { toggle1: !prevState.toggle1 };
    });
  };
  toggle2 = () => {
    this.setState(prevState => {
      return { toggle2: !prevState.toggle2 };
    });
  };
  toggle3 = () => {
    this.setState(prevState => {
      return { toggle3: !prevState.toggle3 };
    });
  };
  toggle4 = () => {
    this.setState(prevState => {
      return { toggle4: !prevState.toggle4 };
    });
  };
  toggle5 = () => {
    this.setState(prevState => {
      return { toggle5: !prevState.toggle5 };
    });
  };
  toggle6 = () => {
    this.setState(prevState => {
      return { toggle6: !prevState.toggle6 };
    });
  };
  disable() {
    if (this.state.pixalCheck === []) {
      document.getElementById("rainbow").disabled = true;
    }
  }
  postColor() {
    let date = moment().format("YYYY-MM-DD");
    this.props.color !== "white"
      ? this.props.user &&
        axios
          .post("/api/pixals", {
            user_id: this.props.user.id,
            date: date,
            mood: this.props.color
          })
          .then(() => {
            this.setState({ posting: true });
            this.timeTwo();
          })
          .catch(() => {
            this.setState({ duplicatedEntry: true });
            this.time();
          })
      : alert("Please select a Color First");
  }
  time() {
    setTimeout(() => {
      this.setState({ duplicatedEntry: false });
    }, 4000);
  }
  timeTwo() {
    setTimeout(() => {
      this.setState({ posting: false });
    }, 2000);
  }

  render() {
    const { changeColor } = this.props;
    return (
      <div>
        <div className="ColorBox">
          <p className="instructions" id="instruct-one">
            scroll over colors to find your mood
          </p>
          <p className="instructions" id="instruct-two">
            click colors once to find your mood and twice to select color
          </p>
          <div className="themeOne">
            <button
              id="color-one"
              onClick={() => changeColor("rgb(245,181,107)")}
              onMouseOver={this.toggle1}
              onMouseLeave={this.toggle1}
            >
              1
            </button>
            <button
              id="color-two"
              onClick={() => changeColor("rgb(220,108,120)")}
              onMouseOver={this.toggle2}
              onMouseLeave={this.toggle2}
            >
              2
            </button>
            <button
              id="color-three"
              onClick={() => changeColor("rgb(67,89,148)")}
              onMouseOver={this.toggle3}
              onMouseLeave={this.toggle3}
            >
              3
            </button>
            <button
              id="color-four"
              onClick={() => changeColor("rgb(165,100,120)")}
              onMouseOver={this.toggle4}
              onMouseLeave={this.toggle4}
            >
              4
            </button>
            <button
              id="color-five"
              onClick={() => changeColor("rgb(96,85,110)")}
              onMouseOver={this.toggle5}
              onMouseLeave={this.toggle5}
            >
              5
            </button>
            <button
              id="color-six"
              onClick={() => changeColor("rgb(170,43,34)")}
              onMouseOver={this.toggle6}
              onMouseLeave={this.toggle6}
            >
              6
            </button>
          </div>
          <div className="Emotions">
            <p className={this.state.toggle1 ? "show" : ""}>
              {" "}
              1. Joyful Happy Relaxed Great Content
            </p>
            <p className={this.state.toggle2 ? "show" : ""}>
              {" "}
              2. Productive Energetic Active Motivated
            </p>
            <p className={this.state.toggle3 ? "show" : ""}>
              {" "}
              3. Average Normal Uneventful Good
            </p>
            <p className={this.state.toggle4 ? "show" : ""}>
              {" "}
              4. Sick Tired Lazy Bored Unmotivated
            </p>
            <p className={this.state.toggle5 ? "show" : ""}>
              {" "}
              5. Sad Lonely Insecure Numb
            </p>
            <p className={this.state.toggle6 ? "show" : ""}>
              {" "}
              6. Angry Anxious Frustrated Grumpy
            </p>
          </div>
        </div>
        {this.state.duplicatedEntry && (
          <img
            className="popup"
            src="https://art.pixilart.com/e62f3fa6e0c1c5f.png"
            width="300"
            alt=""
          />
        )}
        {this.state.posting && (
          <img
            className="popupSuccess"
            src="https://www.infinitycruises.co.uk/wp-content/themes/enfold-child/images/ship_steer_wheel3.gif"
            width="200"
            alt=""
          />
        )}
        <div className="rainbowContainer">
          <img src={arrow} alt="" className="arrow" />
          <button
            onClick={() => this.postColor()}
            disabled={!this.state.buttonOn}
          >
            Daily Mood Done
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    color: state.color
  };
}
export default connect(
  mapStateToProps,
  { changeColor }
)(ColorTheme);
