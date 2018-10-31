import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    constructor(){
        super();
        this.state={
            user: true,
        }
    }
    render() {
        return (
            <div className={this.state.user? 'Vertical' : 'Horizontal'}>
                <h1>YEARLY</h1>
                <p>Login</p>
                <div>
                    <ul>
                        <li>Chart</li>
                        <li>Profile</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Header;