import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import ColorTheme from '../ColorTheme/ColorTheme';
import './ChartPage.css';
import {connect} from 'react-redux';
import UserChartJS from '../UserChartJS/UserChartJS';

class Chart extends Component {
    constructor(){
        super();
        this.state={
            toggle:false
        }
    }
    toggle = () =>{this.setState((prevState)=>{return{toggle: !prevState.toggle}})}
    render() {
        return (
            <div className="chartPage">
                {this.props.user? <Calendar/> : ''}
                <ColorTheme/>
                <br></br>
                {this.state.toggle? <UserChartJS user={this.props.user}/> : <footer><div onClick={this.toggle}>analytics</div></footer>}
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