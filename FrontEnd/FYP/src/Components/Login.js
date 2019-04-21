import React, { Component } from 'react';
import '../css/App.css';
import logo from '../Asset/Logo.png';
import {Redirect} from 'react-router-dom'; //impoorting React Router to nav between pages

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      Username:"",
      Password:"",
      error: null,
      Type:false,
      loggedin:false,
      signup: false,
    }

    this.handlePass = this.handlePass.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  handleUser(event){
    var value = event.target.value;
    this.setState({Username: value});
  }

  handlePass(event){
    var value = event.target.value;
    this.setState({Password:value});
  }
  handleSignup(){
    this.setState({signup:true});
  }

  Submit(){
    var data = {Username: this.state.Username , Password: this.state.Password};
    fetch ('https://fypappservice.azurewebsites.net/login',{
    //fetch ('http://localhost:62591//login',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'POST',
      body: JSON.stringify(data),
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          loggedin: results,
        });
      }else {
        this.setState({
          error: "Username or password entered is incorrect"
        });
      }
    },
    (error)=>{
      this.setState({
        error: "There is something wrong with the server. Try again later"
      });
    }
    )
  }
  
  render() {
    if (this.state.loggedin !== false){
      return (<Redirect to={{pathname:'/home', items: this.state.loggedin}} />);
    } else if (this.state.signup){
      return (<Redirect to={{pathname:'/signup'}} />);
    }
    else {
      return (
        <div className="App">
          <header className="loginPage">
            <img src={logo} alt={"Logo"} /> 
            <h1>Friendly Bunch</h1>
            <p className="LoginTxt">No account Click here to <strong onClick={this.handleSignup}>Sign Up</strong></p>
            <div className="row">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Username</span>
                  </div>
                <input type="text" className="form-control" placeholder="Username" onChange={this.handleUser}></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Password</span>
                </div>
                <input type="Password" className="form-control" placeholder="Password" onChange={this.handlePass}></input>
              </div>
            </div>
            <p className="Error">{!this.state.error ? "":this.state.error}</p>
              <button type="button" className="loginBtn btn btn-success" onClick={this.Submit}>Login</button>
            </header>
          </div>
      );
    }
  }
}

export default Login;
