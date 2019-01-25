import React, { Component } from 'react'
import {user as UserService} from '../App'

class ChatList extends Component{

    constructor(props){
        super(props);
        this.state={
            chats:null,
            renderedChats:[]
        }
    }
    componentWillMount(){

        UserService.getChats()
        .then(resp=>{
            this.setState({chats:resp.data.docs})
        }).then(_=>{
            this.setState({renderedChats:this.renderChats()})
        })

    }


    renderChats(){
        var chats=[];
    
        for(var i=0;i<this.state.chats.length;i++){
            var chat=this.state.chats[i];
            chats.push(<li key={chat.id}>#{chat._id}</li>)
        }
        return chats
    }

    render(){
        return(
            <div className="chatList">
                <ul>
                   {this.state.renderedChats}

                </ul>
            </div>
        )

    }
}

export default ChatList;