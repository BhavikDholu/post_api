const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      const user = new UserModel({ name, email, password:hash, gender });
      await user.save();
      res.send({ msg: "user registered" });
    });
  } catch (error) {
    console.log(error);
    res.send("somthing went wrong");
  }
});

userRouter.post("/login",async(req,res)=>{
 const {email,password} = req.body;
    try {
        const user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({ userID:user[0]._id }, 'user');
                    res.send({msg:"success",token});
                }else{
                    res.send({msg:"wrong credential"});
                }
            });
        }else{
            res.send({msg:"wrong credential"});
        }
        
    } catch (error) {
        console.log(error);
        res.send({msg:"wrong credential"})
    }
});

module.exports={
    userRouter
}
