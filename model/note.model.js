const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
title:String,
content:String,
userID:String,
username:String

},{
    versionKey:false
})

const NoteModel=mongoose.model("posts",userSchema)

module.exports=NoteModel