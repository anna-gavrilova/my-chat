import {axios} from '../components/App'

class ConvService {

    openConversation=null;
  
    constructor(){

    }

  
    sendMessage=(message)=>{
        return axios.post("http://127.0.0.1:5000/api/dialogs",message)
    }
    //gets chat sfor the specific user
    getChats=()=>{
        return axios.get("http://127.0.0.1:5000/api/dialogs/")
    }
    



}

export default ConvService