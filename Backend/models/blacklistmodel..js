const mongoose=require("mongoose")

let blackschema=mongoose.Schema({
    token:String
})

let blackmodel=mongoose.model("blacklist",blackschema)

module.exports={
    blackmodel
}