var express= require('express');
const router=express.Router();
const util=require("./../util")
const User=require('../models/user')
const Conversation=require('../models/conversation')

//Create new conversation
router.post("/new",(req,res,next)=>{
    

    const newConvo=new Conversation({
        members:[req.body.loggeduser],
        dateOfCreation: new Date(),
        messageHistory:[]
    });
    if(util.isLoggedIn(req)){
        newConvo.save(newConvo,(err,convo)=>{
            if(err){
                util.resError(res,err)
            }
            else{
                util.res(res,true,"Empty conversation was created",convo)
            }
        })
    }else{
        util.res(res,false,"User is not logged in and cannot create conversations",[]);
    }

})
//gets all the conversations this user is a part of
router.get('/',(req,res,next)=>{
    console.log(req.headers.loggeduser)
    var id=JSON.parse(req.headers.loggeduser).id
    if(util.isLoggedIn(req)){
        Conversation.find({members:id},(err,convos)=>{
            if(err){
                util.resError(res,err);
            }
            else{
                util.res(res,true,"Conversations for this user were retrieved",convos)
            }
        })
        
    }
    else{
        util.res(res,false,"You're not logged in")
    }
})

module.exports=router;