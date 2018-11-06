import React, { Component } from 'react';
import './Messages.css';

export default class Messages extends Component {
    render() {
        const style= {
            background: this.props.mood
        }
        return (
        <div className="Message__container">
            <div className="dateCircle">
            <span className="Message__text">{this.props.text}</span>
                
                <div className="datecircle-side">
                    <div style={style} className="circle"></div>
                    <span className="Message__time">{this.props.date}</span>
                </div>
            </div>
                <img src={this.props.image} width='100'/>
        
      </div>
        );
    }
}