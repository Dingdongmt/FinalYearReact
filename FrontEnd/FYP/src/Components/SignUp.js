import React, { Component } from 'react';
import '../css/App.css';
import $ from "jquery";
import {Redirect} from 'react-router-dom';

//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      back: false,
      items:{
        Name:null,
        Bio:null,
        UserName:null,
        Password:null,
        GroupName:null,
        GroupBio:null,
        Address1:null,
        Address2:null,
        County:null,
        Country:null,
        PostCode:null,
      },
      response: null,
    }
    this.onBackClick = this.onBackClick.bind(this);
    this.onchangeHandle = this.onchangeHandle.bind(this);
    this.Submit = this.Submit.bind(this);
    this.readURL = this.readURL.bind(this);
  }

  onBackClick(){
    this.setState({back:true});
  }

  onchangeHandle(event){
    var value = event.target.value, name =  event.target.name, olditem= this.state.items;
    switch (name){
      case "Name":
      olditem.Name = value
      break;
      case "Bio":
      olditem.Bio = value
      break;
      case "UserName":
      olditem.UserName = value
      break;
      case "Password":
      olditem.Password = value
      break;
      case "GroupName":
      olditem.GroupName = value
      break;
      case "GroupBio":
      olditem.GroupBio = value
      break;
      case "Address1":
      olditem.Address1 = value
      break;
      case "Address2":
      olditem.Address2 = value
      break;
      case "County":
      olditem.County = value
      break;
      case "Country":
      olditem.Country = value
      break;
      default:
      olditem.PostCode = value
    }
    this.setState({items:olditem});
  }
  Submit(){
    var data = this.state.items;
    fetch ('https://fypappservice.azurewebsites.net/Signup',{
    //fetch ('http://localhost:62591//Signup',{
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
          response: "You have successfully made an admin account"
        });
      }else {
        this.setState({
          response: "Please Try again as some of the fields are incorrect"
        });
      }
    },
    (error)=>{
      this.setState({
        response: "There is something wrong with the server. Try again later"
      });
    }
    )
  }
  readURL(event){
    var input = event.target;
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah').attr('src', e.target.result)
      .width(200)
      .height(120);
    };
      reader.readAsDataURL(input.files[0]);
    }
  }
  render() {
    if (this.state.back === true){
        return (<Redirect to={{pathname:'/'}}/>)
        }else{
    return (
      <div className="App">
        <div className="Navigation">
          <div className="row col-md-12">
            <div className="col-md-2 Back"><p className="NavTxt" onClick={this.onBackClick} ><i className="fas fa-chevron-left"></i>Back</p></div>
            <div className="col-md-8 PageName"><h1>SignUp</h1></div>
          </div>
        </div>
        <div className="Signup">        
        <div className="SignupForm row col-md-12">
            <div className="row col-md-4">
            <div className="SignPic col-md-4">
              <input className="SignPicinp" type='file' onChange={this.readURL} />
              <img id="blah" src={this.state.src} alt="Images."  /> 
            </div>
            </div>
            <div className="signuser row col-md-8">
                <div className="row col-md-12">
                  <div className="col-md-4"><p>Name* :</p></div>
                  <div className="col-md-8"><input type="text" name="Name" onChange={this.onchangeHandle}></input></div>
                </div>
                <div className="row col-md-12">
                  <div className="col-md-4"><p>Bio :</p></div>
                  <div className="col-md-8"><input type="text" name="Bio" onChange={this.onchangeHandle}></input></div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-4"><p>UserName* :</p></div>
                    <div className="col-md-8"><input type="text" name="UserName" onChange={this.onchangeHandle}></input></div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-4"><p>Password* :</p></div>
                    <div className="col-md-8"><input type="Password" name="Password" onChange={this.onchangeHandle}></input></div>
                </div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Group Name* :</p></div>
                <div className="col-md-8"><input type="text" name="GroupName" onChange={this.onchangeHandle}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Group Bio :</p></div>
                <div className="col-md-8"><input type="text" name="GroupBio" onChange={this.onchangeHandle}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Address 1* :</p></div>
                <div className="col-md-8"><input type="text" name="Address1" onChange={this.onchangeHandle}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Address 2 :</p></div>
                <div className="col-md-8"><input type="text" name="Address2" onChange={this.onchangeHandle}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>County* :</p></div>
                <div className="col-md-8"><input type="text" name="County" onChange={this.onchangeHandle}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Country* :</p></div>
                <div className="col-md-8"><input type="text" name="Country" onChange={this.onchangeHandle}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>PostCode* :</p></div>
                <div className="col-md-8"><input type="text" name="PostCode" onChange={this.onchangeHandle}></input></div>
            </div>
            <div className="row col-md-12">
            <p className="ERROR">{this.state.response}</p>
            <div className="col-md-4"></div>
            <button type="button" className="loginBtn btn btn-success col-md-4" onClick={this.Submit}>SignUp</button>
            <div className="col-md-4"></div>
            </div>
        </div>
        </div>
      </div>
      );
    }
}
}

export default SignUp;