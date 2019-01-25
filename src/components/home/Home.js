import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import {Auth} from '../../services/auth.service';
import {user as UserService} from '../App'
import {axios} from '../App';

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            user:this.props.user
        }
    }

 



    render(){
        return(
            <div className="homeWrapper">
                 <Grid container spacing={0}>
                    <Grid item xs={12} sm={3}><ChatList/></Grid>
                    <Grid item xs={12} sm={9}><ChatWindow/></Grid>
                </Grid>
            </div>
        );
    }
}

export default Home;