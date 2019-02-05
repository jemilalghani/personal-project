import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../ducks/reducer";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      pixalCheck: null,
      toggle: false
    };
  }
  componentDidMount() {
    axios.get("/api/me").then(response => {
      this.props.userLogin(response.data);
    });
  }
  toggle = () => {
    this.setState(prevState => {
      return { toggle: !prevState.toggle };
    });
  };
  logout() {
    axios.post("/api/logout").then(() => {
      this.props.userLogin(null);
      console.log("Bye Bye");
    });
    sessionStorage.clear();
    this.props.history.push("/");
  }
  // componentWillMount() {
  //   document.addEventListener("touchend", this.handleClick, false);
  //   document.addEventListener('click', this.handleClick, false)
  // }
  // handleClick = e => {
  //   if (this.node.contains(e.target)) {
  //     return;
  //   }
  //   this.setState({ toggle: false });
  // };
  email() {
    alert("Email Sent");
    this.props.user &&
      axios.post("/api/email", { email: this.props.user.email }).then(() => {});
    this.setState({ toggle: false });
  }
  render() {
    const { user } = this.props;
    const redirect_uri = encodeURIComponent(
      window.location.origin + "/auth/callback"
    );
    const url = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirect_uri}&response_type=code`;
    return this.props.pathname === "/admin" ? (
      <div className="Horizontal">
        <Link to="/">
          <h1>YEARLY</h1>
        </Link>
      </div>
    ) : this.props.pathname !== "/" ? (
      <div className="toggler-header-container">
        <div className="Horizontal">
          {user ? (
            <Link to="/chart">
              <h1>YEARLY</h1>
            </Link>
          ) : (
            <Link to="/">
              <h1>YEARLY</h1>
            </Link>
          )}
          <img
            onClick={this.toggle}
            src="http://www.stickpng.com/assets/images/588a64f5d06f6719692a2d13.png"
            width="25"
            alt=""
          />
          <div className="desktop">
            <ul>
              <Link id="linktoo" to="/chart">
                <li className={this.props.pathname === "/chart" ? "white" : ""}>
                  Calendar
                </li>
              </Link>
              <Link id="linktoo" to="/profile">
                <li
                  className={this.props.pathname === "/profile" ? "white" : ""}
                >
                  Diary
                </li>
              </Link>
              <Link id="linktoo" to="/history">
                <li
                  onClick={this.toggle}
                  className={this.props.pathname === "/history" ? "white" : ""}
                >
                  History
                </li>
              </Link>
              <li>
                <div className="logout" onClick={() => this.logout()}>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <div className="Horizontal">
        <Link to="/">
          <h1>YEARLY</h1>
        </Link>
        <div>
          <a className="login" href={url}>
            Login
          </a>
        </div>
        <div>
          <p>Welcome to Yearly - a daily mood tracker</p>
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
  { userLogin }
)(Header);
