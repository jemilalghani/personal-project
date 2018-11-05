import React, { Component } from 'react';
import moment from 'moment';
import './LandingCal.css';

class Calendar extends Component {
    render() {
        let array = [];
        for (let i=1;i<=366;i++){
            array.push(i)
        }
        let display = array.map((item, index)=>{
            if(item === moment().dayOfYear()){
               return <div className={`day-${item}`} key={index}></div>
            } else {
                return <div className={`day-${item}`} key={index}></div>
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

export default Calendar;