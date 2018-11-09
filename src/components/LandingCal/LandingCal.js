import React, { Component } from 'react';
import moment from 'moment';
import './LandingCal.css';

class Calendar extends Component {
    circleClick= ()=>{
        document.getElementById('jem').style.visibility='hidden';
    }
    render() {
        const circle={
            border: 'solid rgba(0, 0, 0, 0.61) 1.2px'
        }
        let array = [];
        for (let i=1;i<=366;i++){
            array.push(i)
        }
        let display = array.map((item, index)=>{
            if(item === moment().dayOfYear()){
               return <div className={`day-${item}`} style={circle} key={index} onClick={this.circleClick}></div>
            } else {
                return <div id = 'jem' className={`day-${item}`} style={{visibility:'visible'}}key={index}></div>
            }
        })
        return (
           <div className="Calendar">
                <div className='boxone'>
                    {display}
                </div>
           </div> 
        );
    }
}

export default Calendar;