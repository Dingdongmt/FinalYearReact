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
      Post: null,
    }
    
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
    this.onchangeHandle = this.onchangeHandle.bind(this);
    this.Postpost = this.Postpost.bind(this);
    this.mounting = this.mounting.bind(this);
    this.mounting();
  }

  onBackClick(){
    this.setState({back:true});
  }
  onSignoutClick(){
    this.setState({SignOut:true});
  }
  onchangeHandle(event){
    var value = event.target.value, name =  event.target.name;
    switch (name){
      case "Post":
      this.setState({post: value})
      break;
      default:
      this.setState({post: value})
    }
  }
  Postpost(){
    var UserId = this.props.location.items.UserId, Container = this.state.post, currentdate = new Date();
    var SentTime = + currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var data = {UserId, Container, SentTime}
    fetch ('https://fypappservice.azurewebsites.net/PostPost',{
    //fetch ('http://localhost:62591//PostPost',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'POST',
      body: JSON.stringify(data),
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.mounting()
      }else {
        this.setState({
          error: "Could not find any users for this group"
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

  mounting(){
    var data = this.props.location.items;
    fetch ('https://fypappservice.azurewebsites.net/PostDetails',{
    //fetch ('http://localhost:62591//PostDetails',{
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
          error: "Could not find any users for this group"
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
    let table = [], children =[], post=[];
    if(this.state.PostData){
      for (let j = 0; j < this.state.PostData.length; j++) {
        if (this.state.PostData[j].CommentId){
          children.push(<div className="row col-md-10 Comment" key={j}>
            <p className="col-md-2" key={"Name"+j}>{this.state.PostData[j].NickName}</p>
            <p className="col-md-10" key={"CContainer"+j}>{this.state.PostData[j].CContainer}</p>
          </div>)
        }
      }

      for (let j = 0; j < this.state.PostData.length; j++) {
        if ( j === 0 || this.state.PostData[j].PostId !== this.state.PostData[j-1].PostId ){
          post.push(<div className="row col-md-12 PostContainer" key={j}>
            <p className="col-md-2" key={"Name"+j}>{this.state.PostData[j].NickName}</p>
            <p className="col-md-10" key={"CContainer"+j}>{this.state.PostData[j].Container}</p>
            {this.state.PostData[j].CommentId ? children : null}
          </div>)
        }
      }
      //Create the parent and add the children
      table.push(post)
    }
    if( this.state.loading) {
      return (<div className="App">
      <p>Loading Please wait...</p>
      </div>)
    }else{
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
              <div className="col-md-8 PageName"><h1>Explore</h1></div>
              <div className="col-md-2 SignOut"><p className="NavTxt" onClick={this.onSignoutClick}>SignOut</p></div>
            </div>
          </div>
          <div className="Explore">
          <div className="row col-md-12">
          <div className="col-md-8"><input type="text" name="Post" onChange={this.onchangeHandle}></input></div>
          <div className="col-md-2"><button className="postBtn" onClick={this.Postpost}>Post</button></div>
          </div>
            {table}
          </div>
        </div>
        );
      }
    }
  }
}

export default Explore;