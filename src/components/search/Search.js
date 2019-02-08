import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import ChatList from '../home/ChatList'
import ChatWindow from '../home/ChatWindow'
import '../home/Home';
import {_conv as ConvService} from '../App'
import {user as UserService} from '../App'
import {socket} from '../App'
const _=require('underscore')

class Search extends Component{

    constructor(props){
        super(props);
        this.state={
            searchResults:null
        }
        this.results=null;
    }

    search=(e)=>{
        
        UserService.findUsers(e.target.value)
            .then(response=>{
                if(response.data.docs.length!==0 && e){
                    
                    this.setState({
                        searchResults:<div>{this.generate(response.data.docs)}</div>
                    })
                }
                else this.setState({
                    searchResults:(<div className="notFound">No Users Found :(</div>)
                })
            })
    }

    generate(data){
        return _.map(data,(user,key)=>{
            return <div key={key}>
                <span>{user.name}</span>
            </div>
        })
    }


    render(){




        return (<div className="searchWrap">
            
            <input type="text" onChange={(event)=>{if(event.target.value!=='') this.search(event)}}></input>
            <div className="searchResults">
            {this.state.searchResults}
            </div>



        </div>)
    }
}

export default Search

