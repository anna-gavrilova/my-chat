import React, { Component } from 'react'
import auth from '../../services/auth.service';
import UserService from '../../services/user.service'
 
class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            uname:"",
            pass:""
        }
    }
    componentDidMount() {
    }

    loginClick(event){
        
        var body={
            uname:this.state.uname,
            pass:this.state.pass
        }
        auth.login(body)
            .then((resp)=>{
                console.log(resp)
                if(resp.data.docs){
                console.log("From the login component",resp)
                localStorage.setItem("loggedUser",JSON.stringify(resp.data.docs));
                UserService.user=resp.data.docs;
                console.log(UserService.user);

                //notifier service
                //user service
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
              <form>
             
                  Email:
                  <input type="email" required onChange={(event) => this.setState({uname:event.target.value})}></input><br/>
                  Password:
                  <input type="password" required onChange={(event)=>this.setState({pass:event.target.value})}></input><br/>
                  <button onClick={(event) => this.loginClick(event)}>Submit</button>
             </form>
            </header>
          </div>
        )
    }
}
 
export default Login 