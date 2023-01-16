const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const {userRouter} = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { authenticate } = require("./middleware/authenticate.middleware");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome to home page");
});

app.use("/users",userRouter);
app.use(authenticate)
app.use("/posts",postRouter);

app.listen(4500, async()=>{

    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
        console.log("not able to connect");
    }
    console.log("Running port 4500");
})