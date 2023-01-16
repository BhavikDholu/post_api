const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
   const token = req.headers.authorization;

   if(token){
    const decoded_token = jwt.verify(token, 'user');
    if(decoded_token){
        req.body.userId = decoded_token.userID;
        next();
    }else{
        res.send("login first")
    }
   }else{
     res.send("login first")
   }
};

module.exports={
    authenticate
}