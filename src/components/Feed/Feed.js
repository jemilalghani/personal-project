import React, { Component } from 'react';
import './Feed.css';
import moment from 'moment';

class Feed extends Component {
    constructor(){
        super();
        this.state={
            message:[],
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
        console.log(this.state.text.length);
        this.wordCount();
    }
    render() {
        const emotCircle = {
            background: sessionStorage.getItem('color') || this.props.color,
        }
        console.log(moment().dayOfYear())
        return (
            <div className="Feed">
                <div className="Write">
                    <div className="circleandtext">
                        <div style={emotCircle} className="emotCircle"></div>
                        <textarea placeholder="    How has your day been?" onChange={this.handleChange} className={this.state.color? 'red' : ''}></textarea>
                    </div>
                    <div className="buttonFlex">
                        {/* <button id="button-one"></button> */}
                        <button  id="button-two">Submit</button>
                    </div>
                </div>
                <div className="Display">
                    
                </div>
            </div> 
        );
    }
}
export default Feed;