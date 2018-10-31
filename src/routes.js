import React from 'react';
import {Switch, Route } from 'react-router-dom';
// import App from './App';
import Profile from './components/Profile/Profile';
import LandingPage from './components/LandingPage/LandingPage';
import Calendar from './components/Calendar/Calendar';

export default (
    <Switch>
        <Route path='/chart' component={Calendar}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/' component={LandingPage}/>
    </Switch>
)