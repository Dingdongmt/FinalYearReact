import React, { Component } from 'react';
import '../css/App.css';
import {Redirect} from 'react-router-dom';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Explore extends Component {

  constructor(props){
    super(props);
    this.state = {
      back: false,
      SignOut: false,
    }
    
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
  }

  onBackClick(){
    this.setState({back:true});
  }
  onSignoutClick(){
    this.setState({SignOut:true});
  }
  
  render() {
    if (this.state.back === true){
    return (<Redirect to={{pathname:'/home', state: { Username: '123',Password: '123' }}}/>)
    }else if (this.state.SignOut === true){
        return (<Redirect to='/'/>)
    }else{
    return (
      <div className="App">
        <div className="Navigation">
          <div className="row col-md-12">
            <div className="col-md-2 Back"><p className="NavTxt" onClick={this.onBackClick} ><i className="fas fa-chevron-left"></i>Back</p></div>
            <div className="col-md-8 PageName"><h1>Explore</h1></div>
            <div className="col-md-2 SignOut"><p className="NavTxt" onClick={this.onSignoutClick}>SignOut</p></div>
          </div>
        </div>
      </div>
      );
    }
  }
}

export default Explore;