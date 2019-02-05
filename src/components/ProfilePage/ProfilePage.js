import React, { Component } from "react";
import Profile from "../Profile/Profile";
import "./ProfilePage.css";
import ChatWindow from "../ChartWindow/ChatWindow";
import { userMessage } from "../../ducks/reducer";
import Axios from "axios";
import { connect } from "react-redux";
import reload from "./reload.svg";

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      quote:
        "Yesterday is not ours to recover, but tomorrow is ours to win or lose.",
      text: ""
    };
    this.getMessage = this.getMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  getMessage() {
    this.props.user &&
      Axios.get(`/api/messages/${this.props.user.id}`).then(res => {
        this.props.userMessage(res.data);
      });
  }
  componentDidMount() {
    this.getMessage();
  }
  getQuote = () => {
    Axios.get("https://quotes.rest/qod.json")
      .then(res => {
        this.setState({ quote: res.data.contents.quotes[0].quote });
        this.setState({ disable: true });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  handleChange = e => {
    this.setState({ quote: e.target.value });
  };
  render() {
    return (
      <div className="PandF">
        <div>
          <Profile />
          <div className="quotes">
            <p>"{this.state.quote}"</p>
            {!this.state.disable && (
              <img src={reload} alt="" onClick={() => this.getQuote()} />
            )}
          </div>
        </div>
        <div className="PandF-Child">
          {this.props.user && (
            <ChatWindow
              getMessages={this.getMessage}
              userId={this.props.user.id}
            />
          )}
        </div>
        <h4>"MAKING RECORDS SHOULD BE FUN."</h4>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { userMessage }
)(ProfilePage);
