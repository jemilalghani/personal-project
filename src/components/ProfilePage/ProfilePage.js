import React, { Component } from 'react';
import Profile from '../Profile/Profile';
import Feed from '../Feed/Feed';
import './ProfilePage.css';

export default class ProfilePage extends Component {
    render() {
        return (
            <div className="PandF">
                <Profile/>
                <div>
                    <Feed/>
                </div>
            </div>
        );
    }
}