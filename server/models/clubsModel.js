const mongoose=require('mongoose');
const clubsModel=new mongoose.Schema(
    {
        user:{type: Object, required: true},
        name:{type:String,required:true,unique:true},
        image:{type:String,required:true},
        desc:{type:String,required:true},
    },{
        timestamps:true,
    }
);
const Clubs=mongoose.model('Clubs',clubsModel);
module.exports=Clubs;