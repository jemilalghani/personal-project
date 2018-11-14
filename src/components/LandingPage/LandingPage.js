import React, { Component } from 'react';
import LandingCal from '../LandingCal/LandingCal';
import LandingColorTheme from '../ColorTheme/LandingColorTheme';
import ChartJS from '../ChartJS/ChartJS';
import './LandingPage.css';
import banner from './Yearly.svg';

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
                <img src={banner} alt=''/>
                <LandingCal color={this.state.color}/>
                <LandingColorTheme />
                <br></br>
                <br></br>
                <ChartJS/>
                
            </div>
        );
    }
}
export default LandingPage;