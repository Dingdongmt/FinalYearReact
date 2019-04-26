import React, { Component } from 'react';
import '../css/App.css';
import defaultImg from '../Asset/ProfilePicDef.JPG';
import {Redirect} from 'react-router-dom';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      back: false,
      SignOut: false,
      loading: true,
      isAdmin: this.props.location.items.type,
      UserId: this.props.location.items.UserId,
      Response: null,
    }
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
    this.onchangeHandle = this.onchangeHandle.bind(this);
    this.Submit = this.Submit.bind(this);
    
  }
  componentWillMount(){
    var data= this.state.UserId;
    fetch ('https://fypappservice.azurewebsites.net/profile',{
    //fetch ('http://localhost:62591//profile',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'POST',
      body: JSON.stringify({"UserId":data}),
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          data: results,
          loading:false
        });
      }
    },
    )
  }

  onchangeHandle(event){
    var value = event.target.value, name =  event.target.name, olditem= this.state.data;
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
    this.setState({data:olditem});
  }

  Submit(){
    var item = this.state.data;
    fetch ('https://fypappservice.azurewebsites.net/UpdateProfile',{
    //fetch ('http://localhost:62591//UpdateProfile',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'POST',
      body: JSON.stringify(item),
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          loggedin: results,
          response: "Profile successfully updated"
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

  onBackClick(){
    this.setState({back:true});
  }
  onSignoutClick(){
    this.setState({SignOut:true});
  }
  
  render() {
    if (this.state.back === true){
    return (<Redirect to={{pathname:'/home', items: this.props.location.items}} />)
    }else if (this.state.SignOut === true){
        return (<Redirect to='/'/>)
    }else if(this.state.loading){
      return (<div className="App">
      <p>Loading Please wait...</p>
      </div>)
    }else{
    return (
      <div className="App">
        <div className="Navigation">
          <div className="row col-md-12">
            <div className="col-md-2 Back"><p className="NavTxt" onClick={this.onBackClick} ><i className="fas fa-chevron-left"></i>Back</p></div>
            <div className="col-md-8 PageName"><h1>Profile</h1></div>
            <div className="col-md-2 SignOut"><p className="NavTxt" onClick={this.onSignoutClick}>SignOut</p></div>
          </div>
        </div>
        <div className="Profile">
        <div className="row col-md-12">
            <div className="ProfilePic row col-md-4"><img className="ProfilePic" src={!this.state.data.image?defaultImg:this.state.data.image} alt="ProfilePicture."  /> </div>
            <div className="ProfileUser row col-md-8">
                <div className="row col-md-12">
                    <div className="col-md-4"><p>Name :</p></div>
                    <div className="col-md-8"><input type="text" name="Name" value={this.state.data.Name} onChange={this.onchangeHandle}></input></div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-4"><p>Nick name :</p></div>
                    <div className="col-md-8"><input type="text" name="NickName" onChange={this.onchangeHandle} value={this.state.data.NickName}></input></div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-4"><p>UserName :</p></div>
                    <div className="col-md-8"><input type="text" name="UserName" onChange={this.onchangeHandle} value={this.state.data.UserName}></input></div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-4"><p>Password :</p></div>
                    <div className="col-md-8"><input type="password" name="Password" onChange={this.onchangeHandle} value={this.state.data.Password}></input></div>
                </div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Group Name :</p></div>
                <div className="col-md-8">{this.state.isAdmin !== "False" ?<input type="text" onChange={this.onchangeHandle} name="GroupName" value={this.state.data.GroupName}></input>:<input disabled type="text" value={this.state.data.GroupName}></input>}</div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Group Bio :</p></div>
                <div className="col-md-8">{this.state.isAdmin !== "False"?<input type="text" onChange={this.onchangeHandle} name="Bio" value={this.state.data.Bio}></input>:<input disabled type="text" value={this.state.data.Bio}></input>}</div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Address 1 :</p></div>
                <div className="col-md-8">{this.state.isAdmin !== "False"?<input type="text" onChange={this.onchangeHandle} name="Address1" value={this.state.data.Address1}></input>:<input disabled type="text" value={this.state.data.Address1}></input>}</div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Address 2 :</p></div>
                <div className="col-md-8">{this.state.isAdmin !== "False"?<input type="text" onChange={this.onchangeHandle} name="Address2" value={this.state.data.Address2}></input>:<input disabled type="text" value={this.state.data.Address2}></input>}</div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>County</p></div>
                <div className="col-md-8">{this.state.isAdmin !== "False"?<input type="text" onChange={this.onchangeHandle} name="County" value={this.state.data.County}></input>:<input disabled type="text" value={this.state.data.County}></input>}</div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Country :</p></div>
                <div className="col-md-8">{this.state.isAdmin !== "False"?<input type="text" onChange={this.onchangeHandle} name="Country" value={this.state.data.Country}></input>:<input disabled type="text" value={this.state.data.Country}></input>}</div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>PostCode :</p></div>
                <div className="col-md-8">{this.state.isAdmin !== "False"?<input type="text" onChange={this.onchangeHandle} name="PostCode" value={this.state.data.PostCode}></input>:<input disabled type="text" value={this.state.data.PostCode}></input>}</div>
            </div>
            <p className="ERROR">{this.state.response}</p>
            <div className="row col-md-12">
            <div className="col-md-4"></div>
            <button type="button" className="loginBtn btn btn-success col-md-4" onClick={this.Submit}>Update</button>
            <div className="col-md-4"></div>
            </div>
        </div>
        </div>
      </div>
      );
    }
  }
}

export default Profile;