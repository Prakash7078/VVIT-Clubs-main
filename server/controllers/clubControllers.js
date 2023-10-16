const { StatusCodes } = require('http-status-codes');
const ClubRegister = require('../models/clubRegisterModel');
const Clubs=require('../models/clubsModel');
const User=require('../models/userModel');
const express=require('express');
const { sendMail } = require('../middleware/sendMail');
const clubRouter=express.Router();
const getClubs=async(req,res)=>{
    const clubs=await Clubs.find({});
    res.send(clubs);
};
const getClubRegisters=async(req,res)=>{
    const registers=await ClubRegister.find({});
    return res.status(StatusCodes.OK).send(registers);
}
const updateUserregister=async(req,res)=>{
    const rollno=String(req.params.roll);
    console.log("rollno",req.params.roll);
    const newOne=await ClubRegister.findOneAndUpdate({roll:rollno},{category:req.body.category},{new:true})
    const newUser=await User.findOneAndUpdate({rollno:rollno},{category:req.body.category},{new:true})
    console.log("newone",newOne);
    console.log("newone",newUser);
    res.status(StatusCodes.OK).json({message:"Coordination changed succesfully"});
};
const clubRegister=async(req,res)=>{
    const {clubname,image,category,username,branch,year,rollno,section}=req.body.data;
    const res1=await ClubRegister.findOne({roll:rollno});
    const user1=await User.findOne({rollno:rollno});
    if(res1){
        console.log(res1);
        return res.json({error: true,message:`You already registered for ${res1.club} club`});
    }
    const result=await ClubRegister({
        club:clubname,
        category:category,
        name:username,
        userimage:image,
        year:year,
        branch:branch,
        roll:rollno,
        section:section,
    });
    await result.save();
    await sendMail(user1.email,`You succesfully registered in ${clubname} club. From now onwards you are a member of ${clubname} club. If u want to change club you can mail ur rollno to vvitclubs7078@gmail.com`)
    return res.status(StatusCodes.OK).json({message:"Club Registration succesfully"});
}
const getChooseclub=async(req,res)=>{
    const club=await Clubs.findOne({name:req.params.name});
    if(club){
        res.send(club);
    }
    else{
        res.status(404).send({message:'Product not Found'});
    }
};

module.exports={getChooseclub,getClubs,clubRegister,getClubRegisters,updateUserregister};