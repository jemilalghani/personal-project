import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import ColorTheme from '../ColorTheme/ColorTheme';
import './LandingPage.css';
import {connect} from 'react-redux';

class LandingPage extends Component {

    render() {
        return (
            <div className="LandingPage">
                <Calendar/>
                <ColorTheme/>
                
            </div>
        );
    }
}
export default LandingPage;