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
            date: null,
            first_click: true
        }
        this.time = this.time.bind(this);
        this.clear = this.clear.bind(this);
    }
    componentDidMount(){
        setTimeout(() => {
                Axios.get(`/api/pixals/${this.props.user.id}`).then(res=>{
                    this.setState({pixalColors: res.data})
                }).catch(error=>{
                    console.log('error in mount', error)
                })
        }, 0)
    }
    handleClick(e){
        this.setState({date: e});
        // this.time();
    }
    dateToNull =(e)=>{
        if(this.state.date === e){
            this.setState({date: null})
        }
    }
    time(){
        let initial = setTimeout(()=>{this.setState({date:null})},4000);
        this.clear(initial)
    }
    clear(name){
        clearTimeout(name)
    }
    componentWillMount(){
        document.addEventListener('click', this.handleToggle, false)
        document.addEventListener('touchend', this.handleToggle, false)
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleToggle, false);
        document.removeEventListener('touchend', this.handleToggle, false);
    }
    handleToggle = (e) =>{
        if(this.node.contains(e.target)){
            return;
        }
        this.setState({date:null});
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
                return <div style={{background: `${this.state.pixalColors[index].mood}`}} className={`day-${item}`} 
                onClick={()=>{this.handleClick(item) 
                              this.dateToNull(item)}}>
                            <span className={this.state.date? "popUpText": 'hidepopup"'} style={{visibility: this.state.date === item ? 'visible' : 'hidden'}}>
                                {moment().dayOfYear(item).format('MMMM Do YYYY dddd')}
                            </span>
                        </div>
            } else if(item === moment().dayOfYear()){
                return <div style={currentDay} className={`day-${item}`} onClick={()=>{this.handleClick(item) 
                                                                                        this.dateToNull(item)}}>
                            <span className={this.state.date? "popUpText": 'hidepopup"'} style={{visibility: this.state.date === item ? 'visible' : 'hidden'}}>
                                {moment().dayOfYear(item).format('MMMM Do YYYY dddd')}
                            </span>
                        </div>
            } else {
                return <div style={{background: 'white'}} className={`day-${item}`} onClick={()=>{this.handleClick(item) 
                                                                                                    this.dateToNull(item)}}>
                        <span className={this.state.date? "popUpText": 'hidepopup"'} style={{visibility: this.state.date === item ? 'visible' : 'hidden'}}>
                            {moment().dayOfYear(item).format('MMMM Do YYYY dddd')}
                        </span>
                    </div>
            }
        })
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        let numberDate = moment(startOfMonth).dayOfYear();
        let arrayTwo = [];
        for (let i=numberDate; i<=numberDate+30; i++){
            arrayTwo.push(i)
        }
        let displayMonth = this.state.pixalColors && arrayTwo.map(item=>{
            if (this.state.pixalColors.findIndex(e =>  { 
                return moment(e.date).dayOfYear() === item
                }) !== -1){
                let index = this.state.pixalColors.findIndex(e => moment(e.date).dayOfYear() === item)
                return <div style={{background: `${this.state.pixalColors[index].mood}`}} className={`day-${item}`}> </div>
            } else if(item === moment().dayOfYear()){
                return <div style={currentDay} className={`day-${item}`}></div>
            } else {
                return <div style={{background: 'white'}} className={`day-${item}`}></div>
            }
        })
        return (
           <div className="Calendar">
                <div className='box' ref={node=>this.node = node}>
                    {display? display: <img src="https://loading.io/spinners/fidget-spinner/lg.fidget-spinner.gif" width='100' alt=''/>}
                </div>
                <div className='boxMonth'>
                    {displayMonth? displayMonth: <img src="https://loading.io/spinners/fidget-spinner/lg.fidget-spinner.gif" width='50' alt=''/>}
                </div>
                {/* <div className="datePopUp">
                    <span className="popUpText">{this.state.date}</span>
                </div> */}
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