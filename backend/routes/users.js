var express= require('express');
const router=express.Router();
const util=require("../util")
const User=require('../models/user')

//Add new user
router.post("/new",(req,res,next)=>{
    
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:0,
        conversations:[]

    })

    User.new(newUser,(err,user)=>{
        if(err){
            util.resError(res,err)
        }
        else{
            util.res(res,true,"User was added",user)
        }
    })
})

//Get all users
router.get('/',(req,res,next)=>{
    console.log("req header:",req.headers)
    User.find({},(err,users)=>{
        if(err){
            util.resError(res,err);
        }
        else{
            util.res(res,true,"Users were retrieved",users)
        }
    })
})

module.exports=router;