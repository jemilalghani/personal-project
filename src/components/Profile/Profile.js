import React, { Component } from 'react';
import './Profile.css';
import {connect} from 'react-redux';
import{userLogin} from '../../ducks/reducer';
import Axios from 'axios';

class Profile extends Component {
    constructor(){
        super();
        this.state={
            buttonClick: false
        }
        this.changeButton = this.changeButton.bind(this);
        this.saveUpdate=this.saveUpdate.bind(this);
    }
    componentDidMount(){
        Axios.get('/api/me').then(res=>{
            this.props.userLogin(res.data);
        }).catch(error=>{
            console.log('error in mount', error)
        })
    }
    changeButton(){
        this.setState((prevState)=>{return{buttonClick: !prevState.buttonClick}})
    }
    saveUpdate(){
        this.setState({buttonClick:false})
    }
    render() {
        return (
                <div className="Profile">
                    {this.props.user ?
                        <div className="boxtop">
                            <img className="circle" src={this.props.user.picture} alt="https://cdn.pixabay.com/photo/2018/01/19/14/40/nature-3092555_960_720.jpg"/>
                        </div>
                        :
                        <div className="boxtop">
                            <img className="circle" src="https://www.thespruce.com/thmb/pXjTPWmGforPCGxJgTM_yXKpTGg=/776x580/filters:no_upscale()/Halo_BM-56a192a35f9b58b7d0c0c0d7.png"/>
                        </div>
                    }
                    <div className="boxbottom">
                        {this.props.user
                         &&
                        <div className="inputbox">
                            <h3>{this.props.user.name}</h3>
                            <h3>{this.props.user.email}</h3>
                            <p>“ Yesterday is not ours to recover, but tomorrow is ours to win or lose.”</p>
                        </div>
                        }
                        <div className="editsaveButton">
                            <button onClick={this.changeButton}>E</button>
                            {/* {console.log(this.state.buttonClick)} */}
                            <button className={this.state.buttonClick? '': 'none'} onClick={this.saveUpdate} >S</button>
                        </div>
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