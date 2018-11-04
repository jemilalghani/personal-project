import React, { Component } from 'react';
import LandingCal from '../LandingCal/LandingCal';
import LandingColorTheme from '../ColorTheme/LandingColorTheme';
import './LandingPage.css';

class LandingPage extends Component {
    constructor(){
        super();
        this.state={
            color: 'white'
        }
    }

    render() {

        return (
            <div className="LandingPage">
                <LandingCal color={this.state.color}/>
                <LandingColorTheme />
                
            </div>
        );
    }
}
export default LandingPage;