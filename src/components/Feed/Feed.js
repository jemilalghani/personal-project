import React, { Component } from 'react';
import './Feed.css';
import {connect} from 'react-redux';
import moment from 'moment';
import Axios from 'axios';

class Feed extends Component {
    constructor(){
        super();
        this.state={
            text:'',
            color:false
        }
        this.wordCount = this.wordCount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    wordCount(){
        this.state.text.length >= 250 && this.setState({color: true})
        this.state.text.length <= 250 && this.setState({color: false})
    }
    handleChange( event ) {
        this.setState({ text: event.target.value });
        // console.log(this.state.text.length);
        this.wordCount();
    }
    clearTextArea(){
        this.setState({text:' '})
    }
    postMessage(){
        let year = moment().format('YYYY');
        let date = moment().format('L');
        let numberDate = moment().dayOfYear()
        Axios.post(`/api/messages/${this.props.user.id}`, {
            user_id: this.props.user.id,
            year: year,
            date: date.toString(),
            number_date: numberDate,
            message: this.state.text
        }).then(()=>{
            this.props.getMessages()
        })
        this.clearTextArea()
    }
    render() {
        const emotCircle = {
            background: sessionStorage.getItem('color') || this.props.color,
        }
        return (
            <div className="Feed">
                <div className="Write">
                    <div className="circleandtext">
                        <div style={emotCircle} className="emotCircle"></div>
                        <textarea placeholder="    How has your day been?" value={this.state.text} onChange={this.handleChange} className={this.state.color? 'red' : ''}></textarea>
                    </div>
                    <div className="buttonFlex">
                        {/* <button id="button-one"></button> */}
                        <button  id="button-two" onClick={()=>this.postMessage()}>Submit</button>
                    </div>
                </div>
            </div> 
        );
    }
}
function mapStateToProps(state){
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Feed);