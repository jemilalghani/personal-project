import React from 'react';
import {Switch, Route } from 'react-router-dom';
// import App from './App';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LandingPage from './components/LandingPage/LandingPage';
import ChartPage from './components/ChartPage/ChartPage';
import Admin from './components/Admin/Admin';

export default (
    <Switch>
        <Route path='/chart' component={ChartPage}/>
        <Route path='/profile' component={ProfilePage}/>
        <Route path='/admin' component={Admin}/>
        <Route exact path='/' component={LandingPage}/>
    </Switch>
)