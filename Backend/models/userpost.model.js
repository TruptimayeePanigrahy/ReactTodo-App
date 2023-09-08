const mongoose=require("mongoose")

const userpostschema=mongoose.Schema({
    title:String,
    description:String,
    userid: String,
    username: String,
     type: [String], // Store user IDs who liked the post
    default: []
  },
{
    versionKey:false,
    timestamps:true
})

const userpostmodel=mongoose.model("userpost",userpostschema)

module.exports={
    userpostmodel
}
