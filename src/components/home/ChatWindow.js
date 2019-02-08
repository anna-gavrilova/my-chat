import React, { Component } from 'react'
import {socket} from '../App'
import io from "socket.io-client"
import './Home.css'
import {_conv as ConvService} from '../App';


class ChatList extends Component{

    constructor(props){
        super(props);
        this.state={
            newMessage:'',
            chatHistory:this.props.chatHistory,
            newmessages:[],
            newmessagetrigger:true
        }
        
        this.renderHistory=this.renderHistory.bind(this)
      


    }

    componentDidMount(){
    }

    componentWillMount(){
    }

    enterRoom(){

    }

    renderHistory(){
        var messages=[];
       if(this.props.chatHistory){
            messages=this.props.chatHistory.slice().map(message=>{
                return <div className={message.sender?(message.sender.id==this.props.user.id?'myMessage':'theirMessage'):''} key={message._id}>{message.sender?message.sender.name:'anonymous'}:{message.text}</div>
            });
       }
       return messages.length?messages:<div className="empty">This chat is empty</div>;
    }


    sendClick=(e)=>{
        
        ConvService.sendMessage(this.state.newMessage,this.props.selectedChat)
            .then(response=>{
                this.setState({
                    newMessage:''
                });
            })
            .then(_=>{
                socket.emit('message',{room:this.props.selectedChat,sender:this.props.user})
            })
     }

     typing=(event)=>{
        this.setState({newMessage:event.target.value})
        
     }

     keyDown=(e)=>{
        if (e.keyCode == 13 ) {
            this.sendClick(e)
        }
     }

    

    render(){
        return(
            <div className="chatWindow wrap">
                <ul className="messageHistory">
                    <div>
                        {this.renderHistory()}
                    </div>

                </ul>
                <div className="inputBox">
                    <input type="text" value={this.state.newMessage} onChange={(event) => this.typing(event)} onKeyDown={this.keyDown}></input>
                    <button type='submit' onClick={(event) => this.sendClick(event)}>Send!</button>
                </div>
                
            </div>
        )

    }
}

export default ChatList;