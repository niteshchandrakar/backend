const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../model/user.model")
const {blacklist}=require("../blacklist")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body
    try{

        bcrypt.hash(pass, 5, async(err, hash)=> {
            const user=new UserModel({username,email,pass:hash})
             await user.save()
        res.status(200).send({"msg":"A new user registerd"})
   
        })

    }catch(err){
        res.send(400).send({"error":err})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
  const user =await UserModel.findOne({email})
//   console.log(user._id)
  if(user){
    
    bcrypt.compare(pass,user.pass,(err,result)=>{
        const token=jwt.sign({userId:user._id,username:user.username},"masai",{expiresIn:"1h"})
        
        if(result){
            res.status(200).send({"msg":"Login Successfull","token":token})
        }
    })
    
  }else{
    res.status(200).send({"msg":"Wrong Credentials"})
  }
    }catch(err){
        res.status(400).send({"error":err})
    }
   

})

userRouter.get("/logout",(req,res)=>{
    const token=req.headers.authorization
try{
    blacklist.push(token)
    res.send({"msg":"The user logged out"})
}catch(err){
res.send({"msg":err})
}
})

module.exports={
    userRouter
}