import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import './Home.css';

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            user:this.props.user,
            selectedChat:null
        }

        this.selectChat=this.selectChat.bind(this)
    }

 

    selectChat(id){
        
        this.setState({
            selectedChat:id
        })
        console.log("State of a parent is changed to",id);

    }


    render(){
        return(
            <div className="homeWrapper">
                 <Grid container spacing={0}>
                    <Grid item xs={12} sm={3}><ChatList selectChat={this.selectChat}/></Grid>
                    <Grid item xs={12} sm={9}><ChatWindow selectedChat={this.state.selectedChat}/></Grid>
                </Grid>
            </div>
        );
    }
}

export default Home;