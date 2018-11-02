import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import './Calendar.css';
import Test from './Test';
import Axios from 'axios';

class Calendar extends Component {
    constructor(){
        super();
        this.state={
            pixalColors: null,
        }
    }
    componentDidMount(){
        // console.log('fasdf')
        setTimeout(() => {
            // console.log('inside component did mount',this.props)
                Axios.get(`/api/pixals/${this.props.user.id}`).then(res=>{
                    console.log(res)
                    this.setState({pixalColors: res.data})
                }).catch(error=>{
                    console.log('error in mount', error)
                })
        }, 0)
        
    }
    // componentDidUpdate(){
    //     this.state.pixalColors && this.state.pixalColors.forEach(item=>{
    //         const databaseColor = {
    //             background: item.mood 
    //         };
    //         var x = document.getElementsByClassName(`day-${item.number_date}`);
    //         console.log('x',x)
    //         // x.setAttribute('style', `background: green`)
    //         console.log(x[0].attributes.style.value);
    //         x[0].attributes.style.value = `background: ${item.mood}`
    //     })

    // }

    changeColor = () => {
        this.test.current.style.color = 'red'
    }

    render() {
        console.log('Jemilaishere', this.state.pixalColors)
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
            if(item === moment().dayOfYear()){
                return <div style={jemila} className={`day-${item}`}></div>
            } else if (this.state.pixalColors.findIndex(e => e.number_date === item) !== -1){
                let index = this.state.pixalColors.findIndex(e => e.number_date === item)
                return <div style={{background: `${this.state.pixalColors[index].mood}`}} className={`day-${item}`}></div>
            } else {
                return <div style={init} className={`day-${item}`}></div>
            }
        }
        )
            // for(let i=0; i<display.length; i++){
            //     for(let obj of this.state.pixalColors) {
            //         if(display[i])
            //     }
            // }
        

        

            // let display2 = array2.forEach((item, index)=>{
            //     const databaseColor = {
            //         background: pixalColors && pixalColors[index].mood 
            //     };
            //    if (pixalColors && item === pixalColors[index].number_date){
            //         return <div style={databaseColor} className={`day-${item}`}></div>
            //     } else {
            //         return display
            //     }
            // })
        

        
        // else if (pixalColors && item === pixalColors[1].number_date) {
        //     return <div style={databaseColor} className={`day-${item}`}></div>
        // } 


        // for (let i=0; i<3; i++){
        //     const databaseColor = {
        //         background: pixalColors && pixalColors[i].mood 
        //     }
        //     return <div style={databaseColor} className={`day-${pixalColors[i].number_date}`}></div> 
        // }


        // console.log('this.props.user.id',this.props)
        console.log(this.test)
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
        color:state.color,
        user:state.user
    }
}
export default connect(mapStateToProps)(Calendar);