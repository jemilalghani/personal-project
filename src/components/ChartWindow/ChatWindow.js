import React, { Component } from 'react';
import './ChatWindow.css';
import {connect} from 'react-redux';
import Messages from '../Messages/Messages';


class ChatWindow extends Component {
    componentDidMount(){
        this.props.getMessages() 
    }
    render() {
       this.props.messages &&  console.log(this.props.messages)
        return (
            <div className="chat-container">
                <div className="chat-parentcontainer">
                {
                this.props.messages && this.props.messages.map( message => (
                    <Messages id={ message.id} key={ message.id } text={ message.message } image={message.picture} date={ message.date } mood={message.mood}/>
                ))
                }
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        messages:state.messages,
    }
}
export default connect(mapStateToProps)(ChatWindow);