const mongoose=require("mongoose")

const userpostschema=mongoose.Schema({
    title:String,
    description:String,
    userid:String
},{
    versionKey:false,
    timestamps:true
})

const userpostmodel=mongoose.model("userpost",userpostschema)

module.exports={
    userpostmodel
}
