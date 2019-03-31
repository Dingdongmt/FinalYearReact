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
    }

    this.handlePass = this.handlePass.bind(this);
    this.handleUser = this.handleUser.bind(this);
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

  Submit(){
    if (this.state.Username === "123" && this.state.Password === "123") {
      this.setState({loggedin:true});
    }
  }

  //Submit(){
  //   var data = {Username: this.state.Username , Password: this.state.Password};
  //   fetch ('http://localhost:62591/Help/Api/POST-Login',{
  //     method:'POST',
  //     body: JSON.stringify(data),
  //     mode: 'no-cors',
  //   }).then(response => response.json())
  //   .then(results => {
  //     console.log("success");
  //     this.setState({
  //       loggedin: true,
  //       items: results,
  //     });
  //   },
  //   (error)=>{
  //     this.setState({
  //       error: "Username or Password is wrong"
  //     });
  //   }
  //   )
  // }
  
  render() {
    if (this.state.loggedin){
      return (<Redirect to={{pathname:'/home', state: { Username: '123',Password: '123' }}} />);
    }
    else {
      return (
        <div className="App">
          <header className="loginPage">
            <img src={logo} alt={"Logo"} /> 
            <h1>Friendly Bunch</h1>
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
            <p className="error">{!this.state.error ? "":this.state.error}</p>
              <button type="button" className="loginBtn btn btn-success" onClick={this.Submit}>Login</button>
            </header>
          </div>
      );
    }
  }
}

export default Login;
