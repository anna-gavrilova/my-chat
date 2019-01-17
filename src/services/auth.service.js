const http=require('http');
const axios=require('axios')

function login(body){
    return axios.post("http://127.0.0.1:5000/api/login",body)
}

module.exports.login=login;