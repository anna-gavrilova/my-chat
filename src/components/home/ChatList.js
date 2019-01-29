import React, { Component } from 'react'
import {user as UserService} from '../App'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';





class ChatList extends Component{

    constructor(props){
        super(props);
        this.state={
            chats:null,
            renderedChats:[]
        };
    }




    
    componentWillMount(){
        console.log("component will mount")
        UserService.getChats()
        .then(resp=>{
            this.setState({chats:resp.data.docs})
        }).then(_=>{
            this.setState({renderedChats:this.renderChats()})
        })

    }

    componentDidMount(){
    }

    chatClick(chatid){
        console.log("i clicked a chat name",chatid)
        this.props.selectChat(chatid);
 
    }


    renderChats(){
        var chats=[];
        chats= this.state.chats.map((chat)=>{
            return   <div  key={chat.id} chat={chat.id} onClick={()=>this.chatClick(chat.id)}>
            <ListItem  button>
                <ListItemText primary={chat.id}/>
            </ListItem>
            </div>
        })
        console.log(chats)
        // for(var i=0;i<this.state.chats.length;i++){
        //     var chat=this.state.chats[i];
        //     chats.push(
        //         <div  key={chat.id} chat={chat.id} onClick={()=>this.props.selectChat(chat.id)}>
        //         <ListItem  button>
        //             <ListItemText primary={chat.id}/>
        //         </ListItem>
        //         </div>
        //         )
        // }
        return chats
    }

    render(){
        return(
            <div className='chatList'>
                <List component="nav">
                    {this.state.renderedChats}
                </List>
            </div>
        )

    }
}

export default ChatList;