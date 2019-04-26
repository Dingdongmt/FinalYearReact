import React, { Component } from 'react';
import '../css/App.css';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="App">
        <h1 className="Errorpage">Path does not exist. Please go back or click here to get to login screen <a href="https://friendlybunch.azurewebsites.net/">Click here</a></h1>
        </div>
    );
  }
}

export default Home;