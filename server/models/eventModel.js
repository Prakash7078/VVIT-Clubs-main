const mongoose=require('mongoose');
const eventModel=new mongoose.Schema({
    clubname:{type:String,required:true},
    eventname:{type:String,required:true},
    eventimage:{type:String,default:"https://clubs-bucket.s3.ap-south-1.amazonaws.com/event.jpg"},
    description:{type:String, maxLength:200},
},{
    timestamps:true,
});
const Event=mongoose.model('Event',eventModel);
module.exports=Event;