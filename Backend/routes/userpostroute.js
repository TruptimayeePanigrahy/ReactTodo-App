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
        console.log(req.body)
        let {title,description,userid,username}=req.body
        let newpost=new userpostmodel({title,description,userid,username})
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


// likes implement

userpost.post("/:postId/like", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await userpostmodel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "User has already liked this post" });
      }
      post.likes.push(userId);
    post.likesCount += 1;
    
    await post.save();

    res.send({ likes: post.likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});


userpost.get("/:postId/like", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await userpostmodel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.send({ likes: post.likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


















module.exports={
    userpost
}