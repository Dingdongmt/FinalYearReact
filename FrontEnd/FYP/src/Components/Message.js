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
    }
    
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
    this.mounting = this.mounting.bind(this);
    this.mounting();
  }

  onBackClick(){
    this.setState({back:true});
  }
  onSignoutClick(){
    this.setState({SignOut:true});
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
          PostData: results,
          loading: false
        });
      }else {
        this.setState({
          error: "Could not find any messages"
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
    let table = [], chat =[];
    if(this.state.PostData){
      for (let j = 0; j < this.state.PostData.length; j++) {
        if (this.state.PostData[j].CommentId){
          chat.push(<div className="row col-md-10 Comment" key={j}>
            <p className="col-md-2" key={"Name"+j}>{this.state.PostData[j].NickName}</p>
            <p className="col-md-10" key={"CContainer"+j}>{this.state.PostData[j].CContainer}</p>
          </div>)
        }
      }
      //Create the parent and add the children
      table.push(chat)
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
        <div className="Explore">
          {table}
        </div>
      </div>
      );
    }
  }
}

export default Message;