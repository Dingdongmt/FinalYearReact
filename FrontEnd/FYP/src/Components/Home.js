import React, { Component } from 'react';
import '../css/App.css';
import {Redirect} from 'react-router-dom';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      isAdmin:true,
      routePage:null,
      SignOut: false,
    }
    this.HomeIcon = null;
    this.onSignoutClick = this.onSignoutClick.bind(this);
    //this.routeRender= this.routeRender.bind(this);
  }

  // this.props.location.state.Username,
  // this.props.location.state.Password,
  routeRender(routePage){
    switch(routePage) {
      case "profile":
        this.setState({routePage :<Redirect to={{pathname:'/profile', state: { Username: '123',Password: '123' }}} />});
        break;
      case "explore":
      this.setState({routePage :<Redirect to={{pathname:'/explore', state: { Username: '123',Password: '123' }}} />});
        break;
      case "message":
      this.setState({routePage :<Redirect to={{pathname:'/message', state: { Username: '123',Password: '123' }}} />});
        break;
      default:
      this.setState({routePage :<Redirect to={{pathname:'/users', state: { Username: '123',Password: '123' }}} />});
    }
  }

  onSignoutClick(){
    this.setState({SignOut:true});
  }

  componentWillMount() {
    if (this.state.isAdmin){
      this.HomeIcon = (<div className="HomeIcon">
          <div className="row col-md-12">
            <div className="col-md-3 Main-nav"><i className="fas fa-user" onClick={() => this.routeRender("profile")}></i><p className="mainTxt">Profile</p></div>
            <div className="col-md-3 Main-nav"><i className="fas fa-compass" onClick={() => this.routeRender("explore")}></i><p className="mainTxt">Explore</p></div>
            <div className="col-md-3 Main-nav"><i className="fas fa-comments" onClick={() => this.routeRender("message")}></i><p className="mainTxt">Message</p></div>
            <div className="col-md-3 Main-nav"><i className="fas fa-users" onClick={() => this.routeRender("users")}></i><p className="mainTxt">Users</p></div>
          </div>
        </div>)
    }else{
      this.HomeIcon = <div className="HomeIcon">
          <div className="row col-md-12">
            <div className="col-md-4 Main-nav"><i className="fas fa-user" onClick={() => this.routeRender("profile")}></i><p className="mainTxt">Profile</p></div>
            <div className="col-md-4 Main-nav"><i className="fas fa-compass" onClick={() => this.routeRender("explore")}></i><p className="mainTxt">Explore</p></div>
            <div className="col-md-4 Main-nav"><i className="fas fa-comments" onClick={() => this.routeRender("message")}></i><p className="mainTxt">Message</p></div>
          </div>
        </div>
    }
  }

  render() {
    if (this.state.routePage){
      return (this.state.routePage);
    }else if (this.state.SignOut === true){
      return (<Redirect to='/'/>)
    }else{
    return (
        <div className="App">
          <div className="Navigation">
            <div className="row col-md-12">
              <div className="col-md-2 Back"></div>
              <div className="col-md-8 PageName"><h1>Home</h1></div>
              <div className="col-md-2 SignOut"><p className="NavTxt" onClick={this.onSignoutClick}>SignOut</p></div>
            </div>
          </div>
          {this.HomeIcon}
        </div>
      );
    }
  }
}

export default Home;
