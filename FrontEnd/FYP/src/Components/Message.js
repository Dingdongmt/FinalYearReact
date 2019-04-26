import React, { Component } from 'react';
import '../css/App.css';
import {Redirect} from 'react-router-dom';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Message extends Component {

  constructor(props){
    super(props);
    this.state = {
      back: false,
      SignOut: false,
      Render: null,
      response: null,
    }
    
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
    this.mounting = this.mounting.bind(this);
    this.UserChat = this.UserChat.bind(this);
    this.onchangeHandle= this.onchangeHandle.bind(this);
    this.Message = this.Message.bind(this);
    this.mounting();
    this.UserChat();
  }
  componentWillMount(){
    var data = this.props.location.items;
    fetch ('https://fypappservice.azurewebsites.net/GroupUsers',{
    //fetch ('http://localhost:62591//GroupUsers',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'POST',
      body: JSON.stringify(data),
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          UsersList: results,
        });
      }else {
        this.setState({
          response: "Could not find any users for this group"
        });
      }
    },
    (error)=>{
      this.setState({
        response: "There is something wrong with the server. Try again later"
      });
    }
    )

    fetch ('https://fypappservice.azurewebsites.net/GetChat',{
    //fetch ('http://localhost:62591//GetChat',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'GET',
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          chat: results,
        });
      }else {
        this.setState({
          response: "Could not find any users for this group"
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

  onchangeHandle(event){
    var value = event.target.value;
    this.setState({Message: value});
  }

  Message(){
    var data = {UserId: this.props.location.items.UserId, RecipientId: this.state.RecipientId, Container: this.state.Message};
    fetch ('https://fypappservice.azurewebsites.net/Message',{
    //fetch ('http://localhost:62591//Message',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'POST',
      body: JSON.stringify(data),
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          Message: results,
        });
        this.mounting();
      }else {
        this.setState({
          response: "Could Transfer this message"
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

  UserChat(event){
    var userId = null, Rendere = [];
    if(typeof event !== "undefined"){
      userId = event.target.attributes.name.value
      this.setState({RecipientId: userId});
      if(this.state.ChatInfo && this.state.chat){
        for (let j = 0; j < this.state.ChatInfo.length; j++){
          for (let i = 0; i < this.state.chat.length; i++){
            if ((this.state.chat[i].RecipientId === userId) && 
            (this.state.chat[i].UserId === this.props.location.items.UserId) && 
            this.state.chat[i].ChatId === this.state.ChatInfo[j].ChatId){
              Rendere.push(<div className="chatinfo row col-md-12" key={j}>
                  <p className={this.props.location.items.UserId===this.state.ChatInfo[j].UserId? "White col-md-2":"Red col-md-2"}>{this.state.ChatInfo[j].SentTime}</p>
                  <p className={this.props.location.items.UserId===this.state.ChatInfo[j].UserId? "White col-md-2":"Red col-md-2"}>{event.target.attributes.value.value}</p>
                  <p className={this.props.location.items.UserId===this.state.ChatInfo[j].UserId? "White col-md-8":"Red col-md-8"}>{this.state.ChatInfo[j].Container}</p>
                </div>)
            }
          }
        }
        Rendere.push(<div className="row col-md-12" key="213123141232">
            <div className="col-md-8"><input className="Chatinput" type="text" onChange={this.onchangeHandle}></input></div>
            <div className="col-md-2"><button className="postBtn" onClick={this.Message}>Send</button></div>
          </div>
        )
      }
    }
    this.setState({RenderChat : Rendere});
  }

  mounting(){
    var data = this.props.location.items;
    fetch ('https://fypappservice.azurewebsites.net/ChatInfo',{
    //fetch ('http://localhost:62591//ChatInfo',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'POST',
      body: JSON.stringify(data),
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          ChatInfo: results,
          loading: false
        });
      }else {
        this.setState({
          response: "Could not find any messages"
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

  render() {
    let UserList = [], UserListchildren =[];
    if(this.state.UsersList && this.state.chat){
      for (let j = 0; j < this.state.UsersList.length; j++) {
        UserListchildren.push(<div className="userlist col-md-12" key={j}>
        <p key={"NickName"+j} name={this.state.UsersList[j].UserId} value={this.state.UsersList[j].NickName===""? this.state.UsersList[j].Name : this.state.UsersList[j].NickName} onClick={this.UserChat}>{this.state.UsersList[j].NickName===""? this.state.UsersList[j].Name : this.state.UsersList[j].NickName}</p>
      </div>)
      }
      UserList.push(UserListchildren)
    }

    if (this.state.back === true){
    return (<Redirect to={{pathname:'/home', items: this.props.location.items}}/>)
    }else if (this.state.SignOut === true){
        return (<Redirect to='/'/>)
    }else{
    return (
      <div className="App">
        <div className="Navigation">
          <div className="row col-md-12">
            <div className="col-md-2 Back"><p className="NavTxt" onClick={this.onBackClick} ><i className="fas fa-chevron-left"></i>Back</p></div>
            <div className="col-md-8 PageName"><h1>Message</h1></div>
            <div className="col-md-2 SignOut"><p className="NavTxt" onClick={this.onSignoutClick}>SignOut</p></div>
          </div>
        </div>
        <div className="Message">
        <div className="row col-md-12">
          <div className="col-md-3">
          <div className="row col-md-12"> <h1>UserList</h1> </div>
          {UserList}
          </div>
          <div className="col-md-9">
          {this.state.RenderChat}
        </div>
        </div>
        <p className="ERROR">{this.state.response}</p>
        </div>
        </div>
      );
    }
  }
}

export default Message;