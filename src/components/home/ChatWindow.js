import React, { Component } from 'react'
import {socket} from '../App'
import openSocket from "socket.io-client"
import './Home.css'
import {_conv as ConvService} from '../App';


class ChatList extends Component{

    constructor(props){
        super(props);
        this.state={
            newMessage:'',
            activeChat:this.props.selectedChat
        }
        
        this.enterRoom=this.enterRoom.bind(this)

    }

    componentDidMount(){
    }

    componentWillMount(){
        //enter the room
        this.enterRoom();
        //get the chat history
    }

    enterRoom(){
        const id=this.props.selectedChat;
        socket.emit('enter',id)
        socket.on('entered',(resp)=>{
            this.setState({
                selectedChat:id
            })
        })
        //retrieve message history

    }

    sendClick=(e)=>{
        this.socket.emit('message',this.state.newMessage)
        ConvService.sendMessage(this.state.newMessage,this.props.selectedChat)
            .then(response=>{
                this.setState({
                    newMessage:''
                });
                console.log(response);
            })

        

    }
    

    render(){
        return(
            <div className="chatWindow">
                <ul className="messageHistory">
                    <div>{this.props.selectedChat}</div>

                </ul>
                <div className="inputBox">
                    <input type="text" value={this.state.newMessage} onChange={(event) => this.setState({newMessage:event.target.value})}></input>
                    <button onClick={(event) => this.sendClick(event)}>Send!</button>
                </div>
                
            </div>
        )

    }
}

export default ChatList;