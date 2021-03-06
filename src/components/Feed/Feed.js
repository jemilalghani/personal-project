import React, { Component } from "react";
import "./Feed.css";
import { connect } from "react-redux";
import moment from "moment";
import Axios from "axios";

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      color: false,
      cloud: false
    };
    this.wordCount = this.wordCount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cloudRender = this.cloudRender.bind(this);
  }
  wordCount() {
    this.state.text.length >= 250 && this.setState({ color: true });
    this.state.text.length <= 250 && this.setState({ color: false });
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
    this.wordCount();
  }
  clearTextArea() {
    this.setState({ text: " " });
  }
  postMessage() {
    let date = moment().format("YYYY-MM-DD");
    Axios.post(`/api/messages/${this.props.user.id}`, {
      user_id: this.props.user.id,
      date: date,
      message: this.state.text,
      picture: this.props.image
    }).then(() => {
      this.props.getMessages();
    });
    this.clearTextArea();
  }
  cloudRender() {
    this.setState(prevState => {
      return { cloud: !prevState.cloud };
    });
  }
  render() {
    return (
      <div className="Feed">
        <div className="Write">
          <textarea
            placeholder="Type Here (messages will not display without a finalized mood)"
            value={this.state.text}
            onChange={this.handleChange}
            className={this.state.color ? "red" : ""}
          />
          <button id="button-two" onClick={() => this.postMessage()}>
            Post
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    image: state.image
  };
}
export default connect(mapStateToProps)(Feed);
