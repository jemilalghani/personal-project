import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import './Calendar.css';

class Calendar extends Component {
    render() {
        const jemila = {
            background: this.props.color
        }
        const init = {
            background: 'white'
        }
        let array = [];
        for (let i=1;i<=366;i++){
            array.push(i)
        }
        let display = array.map((item, index)=>{
            if(item === moment().dayOfYear()){
               return <div style={jemila} className={`day-${item}`}></div>
            }else {
                return <div style={init} className={`day-${item}`}></div>
            }
        })  
        return (
           <div className="Calendar">
                <div className='box'>
                    {display}
                </div>
           </div> 
        );
    }
}
function mapStateToProps(state){
    return {
        color:state.color
    }
}
export default connect(mapStateToProps)(Calendar);