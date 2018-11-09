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
        const currentDay = {
            background: this.props.color,
            border: 'solid rgba(0, 0, 0, 0.61) 1.2px'
        }
        let array = [];
        for (let i=1;i<=366;i++){
            array.push(i)
        }
        let display = this.state.pixalColors && array.map((item)=>{
            if (this.state.pixalColors.findIndex(e =>  { 
                return moment(e.date).dayOfYear() === item
                }) !== -1){
                let index = this.state.pixalColors.findIndex(e => moment(e.date).dayOfYear() === item)
                return <div style={{background: `${this.state.pixalColors[index].mood}`}} className={`day-${item}`}></div>
            } else if(item === moment().dayOfYear()){
                return <div style={currentDay} className={`day-${item}`}></div>
            } else {
                return <div style={{background: 'white'}} className={`day-${item}`}></div>
            }
        })
        return (
           <div className="Calendar">
                <div className='box'>
                    {display? display: <img src="https://i.imgur.com/k0jQgLA.gif?noredirect" width='100' alt=''/>}
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