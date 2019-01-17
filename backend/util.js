var util={
res:function(res,success,mess,data){
    res.json({
        success:success,
        message:mess,
        docs:data
    })
}

}

module.exports=util;