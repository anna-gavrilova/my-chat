import React, { Component } from 'react'
import {Auth} from '../../services/auth.service';
import {user as UserService} from '../App'
import {axios} from '../App';
 
class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            uname:"",
            pass:""
        }
        this.auth=new Auth();
    }
    componentDidMount() {

    }

    loginClick(event){
        var that=this;
        var body={
            email:this.state.uname,
            password:this.state.pass
        }
        console.log(body);
        this.auth.login(body)
            .then((resp)=>{
                if(resp.data.success){
                    localStorage.setItem("loggedUser",JSON.stringify(resp.data.docs));
                    axios.defaults.headers.common['loggeduser'] = JSON.stringify(resp.data.docs) // for all requests
                    UserService.setUser(resp.data.docs);
                    that.props.login(resp.data.docs);
                    console.log("User logged in")

                }
                else{
                    console.log("Credentials error");
                }
            })
        
    }

    render() {
        return (
            <div className="Login">
            <header className="Login-header">
              
             
                  Email:
                  <input type="email" required onChange={(event) => this.setState({uname:event.target.value})}></input><br/>
                  Password:
                  <input type="password" required onChange={(event)=>this.setState({pass:event.target.value})}></input><br/>
                  <button onClick={(event) => this.loginClick(event)}>Submit</button>
             
            </header>
          </div>
        )
    }
}
 
export default Login 