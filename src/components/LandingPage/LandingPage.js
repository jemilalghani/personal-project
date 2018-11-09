import React, { Component } from 'react';
import LandingCal from '../LandingCal/LandingCal';
import LandingColorTheme from '../ColorTheme/LandingColorTheme';
import ChartJS from '../ChartJS/ChartJS';
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
                <ChartJS/>
                
            </div>
        );
    }
}
export default LandingPage;