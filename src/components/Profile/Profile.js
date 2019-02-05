import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import { userLogin } from "../../ducks/reducer";
import Axios from "axios";
import edit from "./edit.svg";
import email from "./mail-send.svg";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      buttonClick: false,
      text: "",
      quote: null
    };
    this.changeButton = this.changeButton.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setQuote = this.setQuote.bind(this);
  }
  componentDidMount() {
    Axios.get("/api/me")
      .then(res => {
        this.props.userLogin(res.data);
      })
      .catch(error => {
        console.log("error in mount", error);
      });
    this.setQuote();
  }
  changeButton() {
    this.setState(prevState => {
      return { buttonClick: !prevState.buttonClick };
    });
  }
  email() {
    let value = window.confirm(
      `send welcome email to ${this.props.user.email}`
    );
    if (value) {
      this.props.user &&
        Axios.post("/api/email", { email: this.props.user.email }).then(
          () => {}
        );
      this.setState({ toggle: false });
    }
  }
  saveUpdate() {
    if (this.state.text.length) {
      this.setState({ buttonClick: false });
      this.props.user &&
        Axios.patch(`/api/me/${this.props.user.id}`, {
          name: this.state.text
        }).then(() => {
          this.componentDidMount();
        });
    }
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  setQuote() {
    var now = new Date();
    var millisTill10 =
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0, 0) -
      now;
    if (millisTill10 < 0) {
      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setInterval(() => {
      Axios.get("https://quotes.rest/qod.json").then(res => {
        this.setState({ quote: res.data.contents.quotes[0].quote });
      });
    }, millisTill10);
  }
  render() {
    return (
      <div className="flexProfile">
        <div className="Profile">
          {this.props.user ? (
            <img className="circle" src={this.props.user.picture} alt="" />
          ) : (
            <img
              className="circle"
              src="https://www.thespruce.com/thmb/pXjTPWmGforPCGxJgTM_yXKpTGg=/776x580/filters:no_upscale()/Halo_BM-56a192a35f9b58b7d0c0c0d7.png"
              alt=""
            />
          )}
          <div className="boxbottom">
            {this.props.user && (
              <div className="inputbox">
                <div>
                  <h3>{this.props.user.name}</h3>
                  <img
                    src={edit}
                    alt=""
                    onClick={() => {
                      this.changeButton();
                      this.saveUpdate();
                    }}
                  />
                </div>
                <input
                  className={
                    this.state.buttonClick ? "displayedit" : "hideedit"
                  }
                  onChange={this.handleChange}
                  placeholder="  Input new display name"
                />
                <div>
                  <h3>{this.props.user.email}</h3>
                  <img
                    src={email}
                    alt="NewsLetter"
                    onClick={() => this.email()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    color: state.color,
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { userLogin }
)(Profile);
