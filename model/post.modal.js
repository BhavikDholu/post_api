const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    userId : String
});

const PostModel = mongoose.model("post",postSchema);

module.exports={
    PostModel
}