const express=require("express")
const PostRouter=express.Router()
const auth=require("../middleware/auth.middleware")
const NoteModel=require("../model/note.model")
PostRouter.get("/",auth,async(req,res)=>{
    
    try{
      const notes=await NoteModel.find({username:req.body.username})
      res.status(200).send(notes)
       
    }catch(err){
        res.status(400).send({"error":err})
    }
   


})

PostRouter.post("/add",auth,async(req,res)=>{
    const {title,content,username,userID}=req.body
    try{
       
            const post= await new NoteModel({title,content,username,userID})
            post.save()
           
      
    
        res.status(200).send({"msg":"Post added"})


    }catch(err){
        res.status(400).send({"error":err})
    }

})

PostRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
    
    const payload=req.body
    try{
    if(req.body.userID===note.userID){
       
        await NoteModel.findByIdAndUpdate({_id:noteID},payload)
    }else{
        res.status(200).send({"msg":"YOu are not authorized"})
    }


//const user=await postModel.findOne({id})
res.status(200).send({"msg":"Post is updated"})
}catch(err){
    res.status(400).send({"error":err})
}
})



PostRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
//    console.log(req.body.userID,note.userID)
    try{
    if(req.body.userID===note.userID){
        await NoteModel.findByIdAndDelete({_id:noteID})
    }else{
        res.status(200).send({"msg":"YOu are not authorized"})
    }


//const user=await postModel.findOne({id})
res.status(200).send({"msg":"Post is updated"})
}catch(err){
    res.status(400).send({"error":"wrong"})
}
})

module.exports=PostRouter