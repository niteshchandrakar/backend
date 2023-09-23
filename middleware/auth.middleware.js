const jwt=require("jsonwebtoken")
const { blacklist } = require("../blacklist")

const auth =(req,res,next)=>{
    
        const token=req.headers.authorization
    if(token){
        if(blacklist.includes(token)){
            res.send({"msg":"Login again"})
        }
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
               
                req.body.userID=decoded.userId
                req.body.username=decoded.username
                
                next()
            }else{
                res.send({"msg":"not authorized"})
            }
        })
        //hiii
    }else{
        res.send({"msg":"not authorized"})
    }
}

module.exports=auth