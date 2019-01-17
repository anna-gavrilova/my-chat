var express= require('express');
const router=express.Router();
const util=require("./../util")


router.post("/",(req,res,next)=>{
    util.res(res,true,"Try to login",["mep"])
})

module.exports=router;