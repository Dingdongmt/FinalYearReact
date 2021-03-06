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
      response: null,
    }
    
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
    this.onchangeHandle = this.onchangeHandle.bind(this);
    this.Postpost = this.Postpost.bind(this);
    this.mounting = this.mounting.bind(this);
    this.flagPost = this.flagPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.CommentPost = this.CommentPost.bind(this);
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
      this.setState({comment: value})
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
          response: "Could not post this as there was an issue with the posting"
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

  CommentPost(event){
    var UserId = this.props.location.items.UserId, Container = this.state.comment, PostId = event.target.attributes.PostId.value;
    var data = {UserId, Container, PostId}
    fetch ('https://fypappservice.azurewebsites.net/PostComment',{
    //fetch ('http://localhost:62591//PostComment',{
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
          response: "Could not post this as there was an issue with the posting"
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
          response: "No post or comments were found"
        });
      }
    },
    (error)=>{
      this.setState({
        response: "There is something wrong with the server. Try again later"
      });
    }
    )

    fetch ('https://fypappservice.azurewebsites.net/GetFilters',{ //call this api request
    //fetch ('http://localhost:62591//GetFilters',{
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      method:'GET', // GET HTTPS request
    }).then(response => { return response.json() })
    .then(results => {
      if (results !== "false"){
        this.setState({
          filters: results, //Return set into a state so can be called from anywhere
        });
      }else {
        this.setState({
          response: "No post or comments were found" //erron on the front ent
        });
      }
    },
    (error)=>{
      this.setState({
        response: "There is something wrong with the server. Try again later" // error with api or database
      });
    }
    )
  }

  deletePost(event){
    var PCType = event.target.attributes.value.value, PCId = event.target.attributes.name.value;
    var data = {PCId, PCType};
    fetch ('https://fypappservice.azurewebsites.net/DeletePost',{
    //fetch ('http://localhost:62591//DeletePost',{
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
          response: "there was an issue with deleting this"
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
  flagPost(event){
    var PCConent = event.target.attributes.name.value; //Commented post is as a varibale
    var ContainerWords = PCConent.split(" "); //the prievious varbialbe is split when a SPACE is it
    for (var i = 0; i < ContainerWords.length; i++) { 
      if (ContainerWords[0] !== ("Madan" ||"Thapa"|| "UnReportable"||"i"||"the"||"my")){ //Common words are exempted from being reported
        var data = {BadWord : ContainerWords[i]}; //the words that are bad are set to data
        fetch ('https://fypappservice.azurewebsites.net/ReportPost',{ //api called
        //fetch ('http://localhost:62591//ReportPost',{
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' },
          method:'POST', //methode POST
          body: JSON.stringify(data), //Data is sent as a string 
        }).then(response => { return response.json() }) //return response as a json
        .then(results => {
          if (results !== "false"){ //when the process is successfull 
            this.setState({
              response: "Post has been reported and will be managed"
            });
            this.mounting()
          }else { //when error is front end
            this.setState({
              response: "Issue with reporting this post"
            });
          }
        },
        (error)=>{ //error is API or DATABASE related
          this.setState({
            response: "There is something wrong with the server. Try again later"
          });
        }
        )
      }
    }
  }
  render() {
    let table = [], children =[], post=[], filtered = "", i= 0;
    if(this.state.PostData && this.state.filters){ //check that the post and filter are being passed
      for (let j = 0; j < this.state.PostData.length; j++) { //loop throught all posts
        if (this.state.PostData[j].CommentId){ // check post has commnet
          filtered = this.state.PostData[j].CContainer; //comment is set to a variale Filter
            for(i = 0; i < this.state.filters.length; i++) { //Count the length fo the filter
              filtered = filtered.replace(new RegExp(this.state.filters[i], "g"), "****"); //Using REGEX filter globle of this comment
            }
            //render this with the filtered words displaying
          children.push(<div className="row col-md-10 Comment" key={j}>
            <p className="col-md-2" key={"Name"+j}>{this.state.PostData[j].CCNickName}</p>
            <div className="row col-md-10" key={"CContainer"+j}><p className="col-md-8">{filtered}</p>
            <i className="col-md-2 far fa-flag" name={this.state.PostData[j].CContainer} value="Post" onClick={this.flagPost}/>
            <i className="col-md-2 fas fa-trash-alt" name={this.state.PostData[j].CommentId} value="Comment" onClick={this.deletePost}/></div>
          </div>)
        }
      }

      for (let j = 0; j < this.state.PostData.length; j++) {
        if ( j === 0 || this.state.PostData[j].PostId !== this.state.PostData[j-1].PostId ){
          filtered = this.state.PostData[j].Container;
            for(i = 0; i < this.state.filters.length; i++) {
              filtered = filtered.replace(new RegExp(this.state.filters[i], "g"), "****");
            }
            post.push(<div className="row col-md-12 PostContainer" key={j}>
              <p className="col-md-2" key={"Name"+j}>{this.state.PostData[j].NickName}</p>
              <div className="row col-md-10" key={"CContainer"+j}><p className="col-md-8">{filtered}</p>
              <i className="col-md-2 far fa-flag" name={this.state.PostData[j].Container} value="Post" onClick={this.flagPost}/>
              <i className="col-md-2 fas fa-trash-alt" name={this.state.PostData[j].PostId} value="Post" onClick={this.deletePost}/></div>
              {this.state.PostData[j].CommentId ? children : null}
              <div className="row col-md-12">
              <div className="col-md-8"><input type="text" name="Comment" onChange={this.onchangeHandle}></input></div>
              <div className="col-md-2"><button PostId={this.state.PostData[j].PostId} onClick={this.CommentPost}>Comment</button></div>
              </div>
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
          <div className="col-md-8"><input className="postInp" type="text" name="Post" onChange={this.onchangeHandle}></input></div>
          <div className="col-md-2"><button className="postBtn" onClick={this.Postpost}>Post</button></div>
          </div>
            {table}
            <p className="ERROR">{this.state.response}</p>
          </div>
        </div>
        );
      }
    }
  }
}

export default Explore;