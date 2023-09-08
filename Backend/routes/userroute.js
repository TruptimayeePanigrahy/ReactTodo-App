const express=require("express")
const { usermodel } = require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { blackmodel } = require("../models/blacklistmodel.")
const { auth } = require("../middleware/auth.middleware")
const { client } = require("../utils/reids")

const userroute=express.Router()

userroute.get("/",(req,res)=>{
    res.status(200).send("user route")
})


userroute.post("/register",async (req,res)=>{
    try {
        let {name,email,password}=req.body
        
        let user=await usermodel.findOne({email})
        if(user){
            return res.status(400).send({"msg":"user already present please login"})
        }


        const hashpass = bcrypt.hashSync(password,7);
        
        let newuser=new usermodel({name,email,password:hashpass})
        await newuser.save()
        res.status(200).send({"msg":"registration successfull please login"})

    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})

userroute.post("/login",async (req,res)=>{
    try {
        let {email,password}=req.body
        let user=await usermodel.findOne({email})
        if(!user){
            return res.send({"msg":"user not found please register"})
        }
        let hasspass=bcrypt.compareSync(password,user.password)

        if(!hasspass){
            return res.status(400).send({"msg":"password incorrect"})
        }
        let token=jwt.sign({id:user._id,role:user.role},"laddu",{expiresIn:"60m"})
        client.set('token', token, 'EX', 21600);
        res.status(200).send({"msg":"login successfull","userdetails":user,"token":token})
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})

userroute.get("/logout",auth,async (req,res)=>{
    try {
        let token=await client.get('token');
        let newblack=new blackmodel({token})
        await newblack.save()
        res.send({"msg":"logout successfull"})
    } catch (error) {
        res.send(error.message)
    }
})











module.exports={
    userroute
}