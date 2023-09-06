const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { userpostmodel } = require("../models/userpost.model")

const userpost=express.Router()

userpost.get("/",auth ,(req,res)=>{
    res.send("post route")
})

userpost.get("/allpost",async (req,res)=>{
    try {
        let allpost=await userpostmodel.find()
        res.send({"allpost":allpost})
    } catch (error) {
        res.send(error)
    }
})

userpost.get("/:userid",auth,async (req,res)=>{
    try {
        let {userid}=req.params
        console.log(userid)
        let post=await userpostmodel.find({userid})
        res.send({"allpost":post})
    } catch (error) {
        res.send(error)
    }
})

userpost.post("/post",auth,async (req,res)=>{
    try {
        let {title,description,userid}=req.body
        let newpost=new userpostmodel({title,description,userid})
        await newpost.save()
        res.send({"msg":"post save successfull"})
    } catch (error) {
        res.send(error)
    }
})


userpost.put("/post/:id",auth,async(req,res)=>{
    try {
        let {id}=req.params
        console.log(req.body)
        let updatedata=await userpostmodel.findByIdAndUpdate(id,req.body)
        res.send({"msg":"post update successfull"})
    } catch (error) {
        res.send(error)
    }
})

userpost.delete("/post/:id",auth,async(req,res)=>{
    try {
        let {id}=req.params
        let updatedata=await userpostmodel.findByIdAndDelete(id)
        res.send({"msg":"post delete successfull"})
        
    } catch (error) {
        res.send(error)
    }
})


















module.exports={
    userpost
}