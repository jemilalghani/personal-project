import React, { Component } from 'react';
import './Profile.css';
import {connect} from 'react-redux';
import{userLogin} from '../../ducks/reducer';
import Axios from 'axios';

class Profile extends Component {
    componentDidMount(){
        Axios.get('/api/me').then(res=>{
            this.props.userLogin(res.data);
        }).catch(error=>{
            console.log('error in mount', error)
        })
    }
    render() {
        const emotCircle = {
            background: sessionStorage.getItem('color') || this.props.color,
            border: `solid ${sessionStorage.getItem('color')} .7px` || `solid rgba(0, 0, 0, 0.575) .7px`
        }
        return (
            <div className="PandF">
                <div className="Profile">
                    {this.props.user ?
                    <div className="boxtop">
                        <img className="circle" src={this.props.user.picture} alt="https://cdn.pixabay.com/photo/2018/01/19/14/40/nature-3092555_960_720.jpg"/>
                    </div>:
                    <div className="boxtop">
                        <img className="circle" src="https://www.thespruce.com/thmb/pXjTPWmGforPCGxJgTM_yXKpTGg=/776x580/filters:no_upscale()/Halo_BM-56a192a35f9b58b7d0c0c0d7.png"/>
                    </div>
                    }
                    <div className="boxbottom">
                        {this.props.user &&
                        <div className="inputbox">
                            <h3>{this.props.user.name}</h3>
                            <p>{this.props.user.email}</p>
                            <p>Intention for the year</p>
                        </div>
                        }
                        <div className="editsaveButton">
                            <button>E</button>
                            <button>S</button>
                        </div>
                    </div>

                </div>

                <div className="Feed">
                    <div className="Write">
                        <div className="circleandtext">
                            <div style={emotCircle} className="emotCircle"></div>
                            <textarea placeholder="    How has your day been?"></textarea>
                        </div>
                        <div className="buttonFlex">
                            {/* <button id="button-one"></button> */}
                            <button id="button-two"></button>
                        </div>
                    </div>
                    <div className="Display"></div>
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