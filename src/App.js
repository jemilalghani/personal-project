import React, { Component } from 'react';
import Calendar from './components/Calendar/Calendar';
import ColorTheme from './components/ColorTheme/ColorTheme'
import moment from 'moment';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header></header>
        <Calendar/>
        {console.log(moment().dayOfYear())}
        <ColorTheme/>
      </div>
    );
  }
}

export default App;
