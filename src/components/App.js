import React, { Component } from 'react';
import './App.css';
import Login from './login/Login'
import {BrowserRouter,Link,Route,Redirect} from 'react-router-dom';
import Home from './home/Home';
import Grid from '@material-ui/core/Grid';
import UserService from '../services/user.service'
import ConvService from '../services/conv.service'


var  axios=require('axios')
var user=new UserService();
var _conv=new ConvService();





function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}




class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      loggeduser:JSON.parse(localStorage.getItem('loggedUser'))
    }
   
}


homeTemp=(user)=>{
  return user?<Home user={user}/>:this.loginEl();
}



handleLogoutClick=()=>{
  user.user=null;
  localStorage.removeItem('loggedUser');
  this.setState({
    loggeduser:null
  })
}

login=(user)=>{
  this.setState({loggeduser:user});
}

loginEl(){
  return(
  <Login login={(user)=>this.login(user)}/>
  )
}


  render() {

    let button;
    if (this.state.loggeduser) {
      button = <Link to="/login"><LogoutButton onClick={this.handleLogoutClick} /></Link>;
    } else {
      button = <Link to="/login"><LoginButton/></Link>;
    }


    return (
  
      
      <div className="App">
      
      <BrowserRouter>
     
      <div>
            <div className="menuVisual">
            <Grid container spacing={8}>
              <Grid item xs={12} sm={3}><Link to="/home">Home</Link></Grid>
              <Grid item xs={12} sm={3}><Link to="/extra">EXtra</Link></Grid>
              <Grid item xs={12} sm={3}>
                  {button}
              </Grid>
              <Grid item xs={12} sm={3}></Grid>

            </Grid>

            </div>




                {/* Route for / condition on logged in and not logged in */}
              <div className="routeWindow">
                <Route path="/home" render={()=>this.state.loggeduser?this.homeTemp(this.state.loggeduser):this.loginEl()}/>
                <Route path="/login" render={()=>this.state.loggeduser?this.homeTemp(this.state.loggeduser):this.loginEl()}/>
                <Route path="/extra" render={()=>this.state.loggeduser?<div>ExTra@@</div>:this.loginEl()}/>
              
             </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export {App,axios,user,_conv}
