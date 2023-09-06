const express=require("express")
const cors=require("cors")

const { connection } = require("./utils/db")
const { userroute } = require("./routes/userroute")
const { userpost } = require("./routes/userpostroute")
require("dotenv").config()


const app=express()

app.use(cors())
app.use(express.json())



app.get("/",(req,res)=>{
    res.status(200).send("Home page")
})

app.use("/user",userroute)

app.use("/post",userpost)





app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})