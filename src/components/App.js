import React, { Component } from 'react';
import './App.css';
import Header from "./header/Header";
import Login from './login/Login'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const history=createBrowserHistory();


const Home =() =>(
  <div>This is home</div>
)

const Nav=()=>(
  <BrowserRouter history={history}>
        <div>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/extra">EXtra</Link></li>
          <hr/>
          {/* Route for / condition on logged in and not logged in */}
          <Route path="/home" render={()=><div>Is this HoMe??7</div>}/>
          <Route path="/login" component={Login}/>
          <Route path="/extra" render={()=><div>eXtrA</div>}/>
          </ul>
        </div>
      </BrowserRouter>
)

class Navigation extends React.Component{
  render(){
    return(
      <BrowserRouter history={history}>
        <div>
         
           {/* Route for / condition on logged in and not logged in */}
          <Route path="/home" render={()=><div>Is this HoMe??7</div>}/>
          <Route path="/login" component={Login}/>
          <Route path="/extra" render={()=><div>eXtrA</div>}/>
        </div>
      </BrowserRouter>
    )
  }
}

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      anchorEl: null,
      loogedUser:null
    }
}



handleClick = event => {
  this.setState({ anchorEl: event.currentTarget });
};

handleClose = () => {
  this.setState({ anchorEl: null });
};

  render() {

    const { anchorEl } = this.state;

    return (
     
      <div className="App">
      
      <BrowserRouter>

      <div>
            <div className="menuVisual">
            <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Open Menu
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
              <MenuItem onClick={this.handleClose}><Link to="/home">Home</Link></MenuItem>
              <MenuItem onClick={this.handleClose}><Link to="/login">Login</Link></MenuItem>
              <MenuItem onClick={this.handleClose}><Link to="/extra">EXtra</Link></MenuItem>
            </Menu>
            </div>
                {/* Route for / condition on logged in and not logged in */}
            <div className="routeWindow">
              <Route path="/home" render={()=><div>Is this HoMe??7</div>}/>
              <Route path="/login" component={Login}/>
              <Route path="/extra" render={()=><div>eXtrA</div>}/>
      </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export {App,Navigation}
