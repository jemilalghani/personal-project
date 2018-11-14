import React, { Component } from 'react';
import './ChatWindow.css';
import {connect} from 'react-redux';
import Messages from '../Messages/Messages';
import Axios from 'axios';


class ChatWindow extends Component {
    constructor(){
        super();
        this.delete=this.delete.bind(this);
    }
    componentDidMount(){
        this.props.getMessages() 
    }
    delete(userId, id){
        Axios.delete(`/api/messages/${userId}/${id}`).then(()=>{
            this.props.getMessages();
        })
    }
    render() {
        return (
            this.props.messages.length ?
            <div className="chat-container">
                <div className="chat-parentcontainer">
                {
                this.props.messages && this.props.messages.map( message => (
                    <Messages id={ message.id} key={ message.id } text={ message.message} 
                    image={message.picture} date={ message.date } mood={message.mood} 
                    delete={this.delete}/>
                ))
                }
                </div>
            </div>
            : 
            null
        );
    }
}
function mapStateToProps(state){
    return{
        messages:state.messages
    }
}
export default connect(mapStateToProps)(ChatWindow);