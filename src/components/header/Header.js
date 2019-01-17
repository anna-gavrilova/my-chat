import React, {Component} from 'react';
import './Header.css'
import { BrowserRouter, Route, Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

//Components
import Login from "../login/Login"




export default class Header extends Component

{
    
    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    

    render(){
        const { anchorEl } = this.state;
        console.log(this.props.router)
        return(
            <div className="component-Header">
                <BrowserRouter>
                    <Link to="/extra">Another link to extra</Link>
                </BrowserRouter>
        </div>
        )
    }
}
