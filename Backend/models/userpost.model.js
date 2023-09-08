const mongoose=require("mongoose")

const userpostschema=mongoose.Schema({
    title:String,
    description:String,
    userid: String,
    username: String,
     likes: {
    type: Number,
    default: 0, // Initialize the like count to 0
  },
},{
    versionKey:false,
    timestamps:true
})

const userpostmodel=mongoose.model("userpost",userpostschema)

module.exports={
    userpostmodel
}
