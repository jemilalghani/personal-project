import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import ColorTheme from '../ColorTheme/ColorTheme';
import './ChartPage.css';
import {connect} from 'react-redux';
import UserChartJS from '../UserChartJS/UserChartJS';

class Chart extends Component {
    render() {
        return (
            <div className="chartPage">
                {this.props.user? <Calendar/> : ''}
                <ColorTheme/>
                <UserChartJS user={this.props.user}/>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Chart);