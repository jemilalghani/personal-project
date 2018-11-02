import React, { Component } from 'react';
import './Feed.css';

class Feed extends Component {
    render() {
        const emotCircle = {
            background: sessionStorage.getItem('color') || this.props.color,
        }
        return (
            <div className="Feed">
                    <div className="Write">
                        <div className="circleandtext">
                            <div style={emotCircle} className="emotCircle"></div>
                            <textarea placeholder="    How has your day been?"></textarea>
                        </div>
                        <div className="buttonFlex">
                            {/* <button id="button-one"></button> */}
                            <button  id="button-two">Submit</button>
                        </div>
                    </div>
                <div className="Display"></div>
            </div> 
        );
    }
}
export default Feed;