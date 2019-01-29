import {axios} from '../components/App'

class ConvService {

    openConversation=null;
  
    constructor(){

    }

  
    sendMessage=(msg,dialog)=>{
        var body={
            message:msg,
            dialog:dialog
        }
        //body contains the message itself and the chat id
        return axios.post("http://127.0.0.1:5000/api/dialogs",body)
    }
    //gets chats for the specific user
    getChats=()=>{
        return axios.get("http://127.0.0.1:5000/api/dialogs/")
    }


    



}

export default ConvService