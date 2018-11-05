import React, { Component } from 'react';
import Profile from '../Profile/Profile';
import Feed from '../Feed/Feed';
import './ProfilePage.css';
import ChatWindow from '../ChartWindow/ChatWindow';
import {userMessage} from '../../ducks/reducer';
import Axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';

class ProfilePage extends Component {
    constructor(){
        super();
        // this.getMessages = this.getMessages.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }
    getMessage(){
        this.props.user && Axios.get(`/api/messages/${this.props.user.id}/${moment().dayOfYear()}`).then((res)=>{
            this.props.userMessage(res.data)
        })
    }
    componentDidMount(){
        this.props.user && Axios.get(`/api/messages/${this.props.user.id}`).then((res)=>{
            this.props.userMessage(res.data)
        })
    }
    render() {
        return (
            <div className="PandF">
                <Profile/>
                <div className="PandF-Child">
                    <Feed getMessages={this.getMessage}/>
                    <ChatWindow/>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {userMessage})(ProfilePage);