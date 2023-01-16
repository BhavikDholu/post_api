const express = require("express");
const { PostModel } = require("../model/post.modal");


const postRouter = express.Router();

postRouter.get("/", async(req,res)=>{
   const userId = req.body.userId;
    try {
        const data = await PostModel.find({userId:userId});
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("somthing went wrong");
    }
});

postRouter.post("/create", async(req,res)=>{

    try {
        const post = new PostModel(req.body);
         await post.save();
         res.send({msg:"successfully added"});
    } catch (error) {
        console.log(error);
        res.send("somthing went wrong");
    }
});

postRouter.patch("/update/:id", async(req,res)=>{
   const postId = req.params.id;
   const post = await PostModel.find({_id:postId});
   const post_userId = post[0].userId;
   const userId = req.body.userId;
    try {
        if(userId == post_userId){
            await PostModel.findByIdAndUpdate({_id:postId},req.body);
            res.send("updated successfully");
        }else{
            res.send("you are not authorized");
        }
        
    } catch (error) {
        console.log(error);
        res.send("somthing went wrong");
    }
});

postRouter.delete("/delete/:id", async(req,res)=>{

    const postId = req.params.id;
   const post = await PostModel.find({_id:postId});
   const post_userId = post[0].userId;
   const userId = req.body.userId;
    try {
        if(userId == post_userId){
            await PostModel.findByIdAndDelete({_id:postId});
            res.send("Deleted successfully");
        }else{
            res.send("you are not authorized");
        }
        
    } catch (error) {
        console.log(error);
        res.send("somthing went wrong");
    }
});

module.exports={
    postRouter
}