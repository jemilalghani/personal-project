import React, { Component } from 'react';
import LandingCal from '../LandingCal/LandingCal';
import ColorTheme from '../ColorTheme/ColorTheme';
import './LandingPage.css';
import {connect} from 'react-redux';

class LandingPage extends Component {

    render() {
        return (
            <div className="LandingPage">
                <LandingCal/>
                <ColorTheme/>
                
            </div>
        );
    }
}
export default LandingPage;