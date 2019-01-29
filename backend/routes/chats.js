var express= require('express');
const router=express.Router();
const util=require("./../util")
const User=require('../models/user')
const Conversation=require('../models/conversation')


router.get("/:chatid",(req,res,next)=>{
    util.res(res,true,"I am sending you something from chat API......");
})