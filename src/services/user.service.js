import User from '../models/user'
import {axios} from '../components/App'

class UserService {

    user = null;
  
    constructor(){

        if (this.user === null && localStorage.getItem('loggedUser')) {

            this.user=(JSON.parse(localStorage.getItem('loggedUser')))
            axios.defaults.headers.common['loggeduser'] = localStorage.getItem('loggedUser')
          }

    console.log("User in user service",this.user);
    }

    setUser = (user) => {
        this.user=user
    }

    getAllUsers=()=>{
        return axios.get("http://127.0.0.1:5000/api/users")
    }

    getChats=()=>{
        return axios.get("http://127.0.0.1:5000/api/dialogs/")
    }
    



}

export default UserService