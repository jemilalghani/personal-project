import React, { Component } from 'react';
import './Messages.css';
import {connect} from 'react-redux';

class Messages extends Component {
    render() {
        const style= {
            background: this.props.mood
        }
        console.log(this.props.user.id)
        return (
        <div className="Message__container">
            <div className="dateCircle">
                <img src={this.props.image} alt=''/>
                
                <div className="datecircle-side">
                    <div style={style} className="circle"></div>
                    <span className="Message__time">{this.props.date}</span>
                    <button onClick={()=>this.props.delete(this.props.user.id, this.props.id)}>X</button>
                </div>
            </div>
            <span className="Message__text">{this.props.text}</span>
        
      </div>
        );
    }
}
function mapStateToProps(state){
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Messages);