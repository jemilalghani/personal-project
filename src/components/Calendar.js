import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';

class Calendar extends Component {
    constructor(){
        super();
        this.state={
            color: 'white'
        }
    }
    changeColor(color){
        this.setState({
            color:color
        })
    }
    render() {


        const jemila = {
            background: this.state.color
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
                <div className="themeOne">
                    <button id="color-one" onClick={()=>this.changeColor('rgb(245,181,107)')}></button>
                    <button id="color-two" onClick={()=>this.changeColor('rgb(220,108,120)')}></button>
                    <button id="color-three" onClick={()=>this.changeColor('rgb(67,89,148)')}></button>
                    <button id="color-four" onClick={()=>this.changeColor('rgb(165,100,120)')}></button>
                    <button id="color-five" onClick={()=>this.changeColor('rgb(96,85,110)')}></button>
                    <button id="color-six" onClick={()=>this.changeColor('rgb(170,43,34)')}></button>
                </div>
           </div> 
        );
    }
}
export default Calendar;