import React, { Component } from 'react';
import './App.css';
import Login from './login/Login'
import {BrowserRouter,Link,Route,Redirect,Switch} from 'react-router-dom';
import Home from './home/Home';
import Search from './search/Search'
import Grid from '@material-ui/core/Grid';
import UserService from '../services/user.service'
import ConvService from '../services/conv.service'
import Button from '@material-ui/core/Button';
import openSocket from "socket.io-client"




var  axios=require('axios')
var _user=new UserService();
var _conv=new ConvService();
var socket;







class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      loggeduser:JSON.parse(localStorage.getItem('loggedUser'))
    }

    this.handleLogoutClick=this.handleLogoutClick.bind(this)
    this.logout=this.logout.bind(this)

    if(localStorage.getItem('loggedUser')){
      socket=openSocket('http://localhost:8000',{
        forceNew:false
      })
    }

    window.addEventListener('storage', event=>{
      if (event.key == 'logout-event') { 
        this.logout()
      }
      else if(event.key=='loggedUser'){
        axios.defaults.headers.common['loggeduser'] = localStorage.getItem('loggedUser') // for all requests
        _user.setUser(JSON.parse(localStorage.getItem('loggedUser')));
        this.setState({loggeduser:JSON.parse(localStorage.getItem('loggedUser'))},()=>{

          socket=openSocket('http://localhost:8000',{
            forceNew:false
          })
        })
      }
  });
    
   
}


homeTemp=(user,chat)=>{
  return user?<Home user={user} chatSelected={chat}/>:this.loginEl();
}

search=(user)=>{
  return user?<Search user={user}/>:this.loginEl();
}



handleLogoutClick=()=>{

  localStorage.setItem('logout-event','logout'+Math.random())
  socket.close()
  this.logout()
 
}

logout=()=>{
  _user.user=null;
  localStorage.removeItem('loggedUser');
  this.setState({
    loggeduser:null
  });
  axios.defaults.headers.common['loggeduser'] = null
  
}

login=(user)=>{
  axios.defaults.headers.common['loggeduser'] = JSON.stringify(user) // for all requests
  _user.setUser(user);
  this.setState({loggeduser:user},()=>{
    socket=openSocket('http://localhost:8000',{
      forceNew:false
    })
  });
  
}

loginEl(){
  return(
  <Login login={(user)=>this.login(user)}/>
  )
}


  render() {

    let button;
    if (this.state.loggeduser) {
      button =<Link to="/login" className="buttonLink"> <Button variant="contained" color="primary" className='menuBtn' onClick={this.handleLogoutClick} >
                  Logout
               </Button> 
               </Link>
    } else {
      button =
                <Link to="/login" className="buttonLink"><Button variant="contained" color="primary" className='menuBtn'>Login</Button> </Link>
                
    }


    return (
  
      
      <div className="App">
      
      <BrowserRouter>
     
      <div className="router">
            <div className="menuVisual">
            <Grid container spacing={0} className='menuContainer'>

              <Grid item xs={12} sm={4} className='menuBtn'><Link to="/"><Button variant="contained" color="primary" >Home</Button> </Link></Grid>
              <Grid item xs={12} sm={4} className='menuBtn'><Link to="/search"><Button variant="contained" color="primary" >Find</Button> </Link></Grid>
              <Grid item xs={12} sm={4} className='menuBtn'>{button} </Grid>

            </Grid>

            </div>




                {/* Route for / condition on logged in and not logged in */}
              <Switch className="routeWindow">
                <Route exact path="/" render={()=>this.homeTemp(this.state.loggeduser)}/>
                <Route path="/login" render={()=>this.homeTemp(this.state.loggeduser)}/>
                <Route path="/search" render={()=>this.search(this.state.loggeduser)}/>
                <Redirect from="/*" to="/" />
              
             </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export {App,axios,_user,_conv,socket}
