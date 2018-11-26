import React, { Component } from 'react';
import Profile from '../Profile/Profile';
import Feed from '../Feed/Feed';
import './ProfilePage.css';
import ChatWindow from '../ChartWindow/ChatWindow';
import {userMessage} from '../../ducks/reducer';
import Axios from 'axios';
import {connect} from 'react-redux';
// import moment from 'moment';

class ProfilePage extends Component {
    constructor(){
        super();
        this.state={
            quote: null,
            text: '',
        }
        // this.getMessages = this.getMessages.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    getMessage(){
        this.props.user && Axios.get(`/api/messages/${this.props.user.id}`).then((res)=>{
            this.props.userMessage(res.data)
        })
    }
    componentDidMount(){
        this.getMessage()
    }
    getQuote= ()=>{
        Axios.get('https://quotes.rest/qod.json').then(res=>{
                this.setState({quote: res.data.contents.quotes[0].quote})
        }).catch(error=>{
            this.setState({error: error})
        })
    }
    handleChange=(e)=>{
        this.setState({quote:e.target.value})
    }
    render() {
        return (
            <div className="PandF">
                <div>
                    <Profile/>
                    {this.state.quote ? this.state.error ? <input onChange={this.handleChange} placeholder="What's a quote you live by?"></input> : <p className="axioscall">"{this.state.quote}"</p> : <button className="axioscallbutton"onClick={this.getQuote}> Quote of the Day </button>}
                </div>
                <div className="PandF-Child">
                    <Feed getMessages={this.getMessage}/>
                    {this.props.user && <ChatWindow getMessages={this.getMessage} userId={this.props.user.id}/>}
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