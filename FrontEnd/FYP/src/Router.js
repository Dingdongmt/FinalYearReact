import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; //impoorting React Router to nav between pages
import Error from './Components/Error.js';
import Login from './Components/Login.js';
import Home from './Components/Home.js';

class Router extends Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/home' component={Home} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Router;