import React, { Component } from 'react'
import {user as UserService} from '../App'
import {_conv as ConvService} from '../App'

class ChatList extends Component{

    constructor(props){
        super(props);
        this.state={
            newMessage:''
        }
    }

    componentWillMount(){
        //get the chat history
    }
    sendClick=(e)=>{
        this.setState({
            newMessage:''
        })

        //emit th esocket thingie
        //log record

    }
    

    render(){
        return(
            <div className="chatWindow">
                <ul className="messageHistory">
                    <li className="message">Message 1</li>
                    <li className="message">Message 2</li>
                    <li className="message">Message 3</li>

                </ul>
                <input type="text" value={this.state.newMessage} onChange={(event) => this.setState({newMessage:event.target.value})}></input>
                <button onClick={(event) => this.sendClick(event)}>Send!</button>
            </div>
        )

    }
}

export default ChatList;