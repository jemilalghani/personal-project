import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import ColorTheme from '../ColorTheme/ColorTheme';
import {connect} from 'react-redux';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Calendar/>
                <ColorTheme/>
                
            </div>
        );
    }
}
export default LandingPage;