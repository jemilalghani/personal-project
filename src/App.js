import React, { Component } from 'react';
import Header from './components/Header/Header';
import routes from './routes';
import './App.css';
import { withRouter } from "react-router";


class App extends Component {
  render() {
    // console.log(this.props)
    return (
      <div className="App">
        <div>
          <Header pathname={window.location.pathname} history={this.props.history}/>
        </div>
        {routes}
      </div>
    );
  }
}

// {console.log(moment().dayOfYear())}
export default withRouter(App);
