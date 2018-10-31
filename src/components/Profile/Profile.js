import React, { Component } from 'react';
import './Profile.css';
import {connect} from 'react-redux';

class Profile extends Component {
    render() {
        const emotCircle = {
            background: sessionStorage.getItem('color') || this.props.color
        }
        console.log(this.props.color);
        return (
            <div className="PandF">
                <div className="Profile">
                    
                    <div className="boxtop">
                        <div className="circle"> </div>
                    </div>

                    <div className="boxbottom">
                        <div className="inputbox">
                            <h3>Display Name</h3>
                            <p>Email Address</p>
                            <p>Intention for the year</p>
                        </div>
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
                            <button id="button-one"></button>
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
        color:state.color
    }
}
export default connect(mapStateToProps)(Profile);