import React, { Component } from 'react';
import '../css/App.css';
import {Redirect} from 'react-router-dom';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      back: false,
      SignOut: false,
    }
    
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
  }

  componentWillMount(){
    var data = this.props.location.items;
    debugger;
    fetch ('https://fypwebservice.azurewebsites.net/GroupUsers',{
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

  onBackClick(){
    this.setState({back:true});
  }
  onSignoutClick(){
    this.setState({SignOut:true});
  }
  
  render() {
    console.log(this.state.UsersList);
    let table = [], children =[];
    if(this.state.UsersList){
      for (let j = 0; j < this.state.UsersList.length; j++) {
        children.push(<div className="row col-md-12" key={j}>
        <p className="col-md-3" key={"user"+j}>{this.state.UsersList[j].Name}</p>
        <p className="col-md-3" key={"NickName"+j}>{this.state.UsersList[j].NickName}</p>
        <p className="col-md-3" key={"Bio"+j}>{this.state.UsersList[j].Bio}</p>
        <p className="col-md-3" key={"Admin"+j}>{this.state.UsersList[j].Admin? "True": "False"}</p>
        </div>)
      }
      //Create the parent and add the children
      table.push(children)
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
            <div className="col-md-8 PageName"><h1>Users</h1></div>
            <div className="col-md-2 SignOut"><p className="NavTxt" onClick={this.onSignoutClick}>SignOut</p></div>
          </div>
        </div>
        <div className="Users">
          <div className="row col-md-12">
            <h1 className="col-md-3" >UserName</h1>
            <h1 className="col-md-3" >NickName</h1>
            <h1 className="col-md-3" >Bio</h1>
            <h1 className="col-md-3" >Admin</h1>
          </div>
          {table}
          <div className="row col-md-12">
            <h1 className="col-md-6">post</h1>
          </div>
        </div>
      </div>
      );
    }
  }
}

export default Users;