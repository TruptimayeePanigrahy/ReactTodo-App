const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{ type: String, default: 'user', enum: ['user', 'admin'] }
},
{
    versionKey:false,
    timestamps:true
})

const usermodel=mongoose.model("user",userschema)

module.exports={
    usermodel
}