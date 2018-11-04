import React, { Component } from 'react';
import './ChatWindow.css';
import {connect} from 'react-redux';
import Messages from '../Messages/Messages';

class ChatWindow extends Component {
    render() {
        return (
            <div className="chat-container">
                <div className="chat-parentcontainer">
                {
                this.props.messages && this.props.messages.map( message => (
                    <Messages id={ message.id} key={ message.id } text={ message.message } date={ message.date } mood={message.mood}/>
                ))
                }
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        messages:state.messages
    }
}
export default connect(mapStateToProps)(ChatWindow);