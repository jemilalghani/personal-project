import React, { Component } from 'react';
import './Profile.css';
import {connect} from 'react-redux';
import{userLogin} from '../../ducks/reducer';
import Axios from 'axios';

class Profile extends Component {
    constructor(){
        super();
        this.state={
            buttonClick: false,
            text:'',
            quote: null
        }
        this.changeButton = this.changeButton.bind(this);
        this.saveUpdate=this.saveUpdate.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.setQuote = this.setQuote.bind(this)
    }
    componentDidMount(){
        Axios.get('/api/me').then(res=>{
            this.props.userLogin(res.data);
        }).catch(error=>{
            console.log('error in mount', error)
        })
        this.setQuote()
    }
    changeButton(){
        this.setState((prevState)=>{return{buttonClick: !prevState.buttonClick}})
    }
    saveUpdate(){
        if(this.state.text.length) {
            this.setState({buttonClick:false})
            this.props.user && Axios.patch(`/api/me/${this.props.user.id}`, {name:this.state.text}).then(()=>{
                this.componentDidMount();
            })
        } else {
            this.setState({buttonClick:false})
        }
    }
    handleChange(e){
        this.setState({text:e.target.value})
    }
    setQuote(){
        console.log('fired')
        var now = new Date();
        var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
        if (millisTill10 < 0) {
            millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
        }
        setInterval(()=>{
            Axios.get('https://quotes.rest/qod.json').then(res=>{
                this.setState({quote: res.data.contents.quotes[0].quote})
            })
        }, millisTill10)
}
    render() {
        console.log(this.state.quote)
        return (
            <div className="flexProfile">
                <div className="Profile">
                    {this.props.user ?
                        <div className="boxtop">
                            <img className="circle" src={this.props.user.picture} alt=""/>
                        </div>
                        :
                        <div className="boxtop">
                            <img className="circle" src="https://www.thespruce.com/thmb/pXjTPWmGforPCGxJgTM_yXKpTGg=/776x580/filters:no_upscale()/Halo_BM-56a192a35f9b58b7d0c0c0d7.png" alt=''/>
                        </div>
                    }
                    <div className="boxbottom">
                        {this.props.user
                         &&
                        <div className="inputbox">
                            <h3>{this.props.user.name}</h3>
                            <h3>{this.props.user.email}</h3>
                            <p>{this.state.quote ? `"${this.state.quote}"` :  "Yesterday is not ours to recover, but tomorrow is ours to win or lose."}</p>
                        </div>
                        }
                        <div className="editsaveButton">
                            <button onClick={this.changeButton}>Edit</button>
                            {/* {console.log(this.state.buttonClick)} */}
                            <button className={this.state.buttonClick? '': 'none'} onClick={this.saveUpdate} >Save</button>
                        </div>
                    </div>
                </div>
                <div className={this.state.buttonClick? 'inputNewName' : 'none'}>
                    <input onChange={this.handleChange} placeholder="  Please input new display name"/>
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
export default connect(mapStateToProps, {userLogin})(Profile);