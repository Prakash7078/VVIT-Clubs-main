const mongoose=require('mongoose');
const clubsModel=new mongoose.Schema(
    {
        name:{type:String,required:true,unique:true},
        image:{type:String,required:true},
        desc:{type:String,required:true, minLength:200, maxLength:500},
    },{
        timestamps:true,
    }
);
const Clubs=mongoose.model('Clubs',clubsModel);
module.exports=Clubs;