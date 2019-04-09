import React, { Component } from 'react';
import '../css/App.css';
import {Redirect} from 'react-router-dom';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.location.items.type ? this.props.location.items.type : this.props.location.items.type,
      routePage:null,
      SignOut: false,
    }
    this.onSignoutClick = this.onSignoutClick.bind(this);
    //this.routeRender= this.routeRender.bind(this);
  }

  routeRender(routePage){
    switch(routePage) {
      case "profile":
        this.setState({routePage :<Redirect to={{pathname:'/profile', items: this.props.location.items}} />});
        break;
      case "explore":
      this.setState({routePage :<Redirect to={{pathname:'/explore', items: this.props.location.items}} />});
        break;
      case "message":
      this.setState({routePage :<Redirect to={{pathname:'/message', items: this.props.location.items}} />});
        break;
      default:
      this.setState({routePage :<Redirect to={{pathname:'/users', items: this.props.location.items}} />});
    }
  }

  onSignoutClick(){
    this.setState({SignOut:true});
  }

  render() {
    var HomeIcon= null;
    if (this.state.isAdmin === "True") {
      HomeIcon = (<div className="HomeIcon">
          <div className="row col-md-12">
            <div className="col-md-3 Main-nav"><i className="fas fa-user" onClick={() => this.routeRender("profile")}></i><p className="mainTxt">Profile</p></div>
            <div className="col-md-3 Main-nav"><i className="fas fa-compass" onClick={() => this.routeRender("explore")}></i><p className="mainTxt">Explore</p></div>
            <div className="col-md-3 Main-nav"><i className="fas fa-comments" onClick={() => this.routeRender("message")}></i><p className="mainTxt">Message</p></div>
            <div className="col-md-3 Main-nav"><i className="fas fa-users" onClick={() => this.routeRender("users")}></i><p className="mainTxt">Users</p></div>
          </div>
        </div>)
    }else{
      HomeIcon = (<div className="HomeIcon">
          <div className="row col-md-12">
            <div className="col-md-4 Main-nav"><i className="fas fa-user" onClick={() => this.routeRender("profile")}></i><p className="mainTxt">Profile</p></div>
            <div className="col-md-4 Main-nav"><i className="fas fa-compass" onClick={() => this.routeRender("explore")}></i><p className="mainTxt">Explore</p></div>
            <div className="col-md-4 Main-nav"><i className="fas fa-comments" onClick={() => this.routeRender("message")}></i><p className="mainTxt">Message</p></div>
          </div>
        </div>)
    }
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
          {HomeIcon}
        </div>
      );
    }
  }
}

export default Home;
