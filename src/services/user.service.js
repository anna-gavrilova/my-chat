import User from '../models/user'

class UserService {

    user = null;
  
    constructor(){

        if (this.user === null && localStorage.getItem('loggedUser')) {

            this.user=(JSON.parse(localStorage.getItem('loggedUser')))
          }
    }

    setUser = (user) => {
        this.user=user
    }
    



}

export default UserService