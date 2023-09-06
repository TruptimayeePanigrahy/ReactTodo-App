const jwt=require("jsonwebtoken")
const { blackmodel } = require("../models/blacklistmodel.");
const { client } = require("../utils/reids");
const auth=async (req,res,next)=>{
    try {
        let token = await client.get('token');
    // console.log(token)
    if(!token){
        return res.status(400).send({"msg":"please login first147"})
    }
    let blacktoken=await blackmodel.findOne({token})
    if(blacktoken){
        return res.status(400).send({"msg":"please login first"})
    }
    let decoded=jwt.verify(token,"rajesh")
    if(!decoded){
        return res.status(400).send({"msg":"something went wrong please login"})
    }
    req.body.userid=decoded.id
    // console.log("auth",req.body.userid)
    req.body.role=decoded.role
    // console.log(req.body)
    next()
    } catch (error) {
        res.send(error)
    }
}

module.exports={
    auth
}