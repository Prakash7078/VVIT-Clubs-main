const mongoose=require("mongoose");
const chatSchema=new mongoose.Schema({
    user:String,
    text:String,
    likes:Number,
    image:String,
},{
    timestamps:true,
});
const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;