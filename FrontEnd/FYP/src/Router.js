import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; //impoorting React Router to nav between pages
import Error from './Components/Error.js';
import Login from './Components/Login.js';
import Home from './Components/Home.js';
import Profile from './Components/Profile.js';
import Explore from './Components/Explore.js';
import Message from './Components/Message.js';
import Users from './Components/Users.js';

class Router extends Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/home' component={Home} />
                    <Route path='/Profile' component={Profile} />
                    <Route path='/Explore' component={Explore} />
                    <Route path='/Message' component={Message} />
                    <Route path='/Users' component={Users} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Router;