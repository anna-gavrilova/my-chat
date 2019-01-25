import React, { Component } from 'react'

class ChatList extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div className="chatWindow">
                <ul>
                    <li>Message 1</li>
                    <li>Message 2</li>
                    <li>Message 3</li>

                </ul>
            </div>
        )

    }
}

export default ChatList;