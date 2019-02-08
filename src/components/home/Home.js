import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import './Home.css';
import {_conv as ConvService} from '../App'
import {socket} from '../App'
const _=require('underscore')

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            user:this.props.user,
            selectedChat:null,
            chatHistory:null,
            newmessages:null,
            newmessagetrigger:true
        }

        this.selectChat=this.selectChat.bind(this)
        this.subscribeRooms=this.subscribeRooms.bind(this)
        this.getMessages=this.getMessages.bind(this)

        socket.on('message',messageData=>{
            if(this.state.selectedChat===messageData.room){
                this.getMessages(messageData.room)
            }
        
        })

    }

 

    selectChat(id){
        
        this.setState({
            selectedChat:id
        })

        this.getMessages(id)
    }

    getMessages(id){
        ConvService.retrieveMessages(id)
        .then(messages=>{
            this.setState({
                chatHistory:messages.data.docs
            })
        })
    }

    subscribeRooms(rooms){
        _.pluck(rooms,"id").forEach(room=>{
            socket.emit('goOnline',{user:this.state.user.id,room:room})
        })
    }




    render(){
        var isChatSelected=this.state.selectedChat?
        <Grid item xs={12} sm={9} className='wrap'><ChatWindow selectedChat={this.state.selectedChat} chatHistory={this.state.chatHistory} user={this.props.user} newmessages={this.state.newmessages}/></Grid>:
        <div className="noInfo">Select chat from the left</div>
        return(
            <div className="homeWrapper">
                 <Grid container spacing={0} className='wrap'>
                    <Grid item xs={12} sm={3}><ChatList selectChat={this.selectChat} selectedChat={this.state.selectedChat} subscribeRooms={this.subscribeRooms}/></Grid>
                    {isChatSelected}
                    
                </Grid>
            </div>
        );
    }
}

export default Home;