import React, { Component } from 'react';
import '../css/App.css';
import {Redirect} from 'react-router-dom';
//import {browserRouter, Route} from 'react-router-dom'; //impoorting React Router to nav between pages

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      back: false,
      SignOut: false,
      loading: true,
      UserId: this.props.location.items.UserId,
    }
    this.onBackClick = this.onBackClick.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
  }
  componentDidMount(){
    var data= this.state.UserId;
    fetch ('https://fypwebservice.azurewebsites.net/profile',{
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
        <div className="Signup">
        <div className="row col-md-12">
            <div className="row col-md-4"></div>
            <div className="row col-md-8">
                <div className="row col-md-12">
                    <div className="col-md-4"><p>Name :</p></div>
                    <div className="col-md-8"><input type="text" value={this.state.data.Name}></input></div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-4"><p>UserName :</p></div>
                    <div className="col-md-8"><input type="text" value={this.state.data.NickName}></input></div>
                </div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Group Name :</p></div>
                <div className="col-md-8"><input type="text" value={this.state.data.GroupName}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Group Bio :</p></div>
                <div className="col-md-8"><input type="text" value={this.state.data.Bio}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Address 1 :</p></div>
                <div className="col-md-8"><input type="text" value={this.state.data.Address1}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Address 2 :</p></div>
                <div className="col-md-8"><input type="text" value={this.state.data.Address2}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>County</p></div>
                <div className="col-md-8"><input type="text" value={this.state.data.County}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>Country :</p></div>
                <div className="col-md-8"><input type="text" value={this.state.data.Country}></input></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-4"><p>PostCode :</p></div>
                <div className="col-md-8"><input type="text" value={this.state.data.PostCode}></input></div>
            </div>
            <div className="row col-md-12">
            <div className="col-md-4"></div>
            <button type="button" className="loginBtn btn btn-success col-md-4" >Update</button>
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