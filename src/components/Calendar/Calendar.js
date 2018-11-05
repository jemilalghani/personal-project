import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import './Calendar.css';
import Axios from 'axios';

class Calendar extends Component {
    constructor(){
        super();
        this.state={
            pixalColors: null,
        }
    }
    componentDidMount(){
        setTimeout(() => {
                Axios.get(`/api/pixals/${this.props.user.id}`).then(res=>{
                    console.log(res)
                    this.setState({pixalColors: res.data})
                }).catch(error=>{
                    console.log('error in mount', error)
                })
        }, 0)
        
    }

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
        let display = this.state.pixalColors && array.map((item)=>{
            if (this.state.pixalColors.findIndex(e =>  { 
                return e.year.toString() === moment().format('YYYY') && e.number_date === item
                }) !== -1){
                let index = this.state.pixalColors.findIndex(e => e.number_date === item)
                return <div style={{background: `${this.state.pixalColors[index].mood}`}} className={`day-${item}`}></div>
            } else if(item === moment().dayOfYear()){
                return <div style={jemila} className={`day-${item}`}></div>
            } else {
                return <div style={init} className={`day-${item}`}></div>
            }
        })
        return (
           <div className="Calendar">
                <div className='box'>
                    {display? display: <img src="https://media.giphy.com/media/l3V0GQMoaDLVbjXEI/giphy.gif" width='100' alt=''/>}
                </div>
           </div> 
        );
    }
}
function mapStateToProps(state){
    return {
        color:state.color,
        user:state.user
    }
}
export default connect(mapStateToProps)(Calendar);