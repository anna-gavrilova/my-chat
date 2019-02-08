import React, { Component } from 'react';
import './App.css';
import Login from './login/Login'
import {BrowserRouter,Link,Route,Redirect} from 'react-router-dom';
import Home from './home/Home';
import Search from './search/Search'
import Grid from '@material-ui/core/Grid';
import UserService from '../services/user.service'
import ConvService from '../services/conv.service'
import Button from '@material-ui/core/Button';
import openSocket from "socket.io-client"


var  axios=require('axios')
var user=new UserService();
var _conv=new ConvService();
var socket=openSocket('http://localhost:8000');



const classes = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

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

search=(user)=>{
  return user?<Search user={user}/>:this.loginEl();
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
      button =<Link to="/login" className="buttonLink"> <Button variant="contained" color="primary" className={classes.button} onClick={this.handleLogoutClick} >
                  Logout
               </Button> 
               </Link>
    } else {
      button =
                <Link to="/login" className="buttonLink"><Button variant="contained" color="primary" className={classes.button}>Login</Button> </Link>
                
    }


    return (
  
      
      <div className="App">
      
      <BrowserRouter>
     
      <div className="router">
            <div className="menuVisual">
            <Grid container spacing={0}>

              <Grid item xs={12} sm={4}><Link to="/"><Button variant="contained" color="primary" className={classes.button}>Home</Button> </Link></Grid>
              <Grid item xs={12} sm={4}><Link to="/search"><Button variant="contained" color="primary" className={classes.button}>Find</Button> </Link></Grid>
              <Grid item xs={12} sm={4}>{button} </Grid>

            </Grid>

            </div>




                {/* Route for / condition on logged in and not logged in */}
              <div className="routeWindow">
                <Route exact path="/" render={()=>this.homeTemp(this.state.loggeduser)}/>
                <Route path="/login" render={()=>this.homeTemp(this.state.loggeduser)}/>
                <Route path="/search" render={()=>this.search(this.state.loggeduser)}/>
                <Redirect from="/*" to="/" />
              
             </div>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export {App,axios,user,_conv,socket}
