const express=require('express');
const User=require('../models/userModel');
const expressAsyncHandler=require('express-async-handler');
const Clubs=require('../models/clubsModel');
const bcrypt=require('bcryptjs');
const Event = require('../models/eventModel');
const data = require('../data');
const dotenv=require('dotenv');
const uploadImage = require('../middleware/uploadMiddleware');
const StatusCodes=require('http-status-codes');
const Register = require('../models/registerModel');
dotenv.config();
const getDetails=async(req,res)=>{
    await User.deleteMany({});
    const createdUser=await User.create(data.users);
    
    res.send({createdUser});
};
const addEvent=(expressAsyncHandler(async(req,res)=>{
    const events=new Event({
        clubname:req.body.clubName,
        eventname:req.body.name,
        description:req.body.description,
    });
    if (req.file) {
        // Uploading the profile image to AWS S3
        await uploadImage(req.file);
  
        // Setting the cover image URL in the book model
        events.eventimage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profile-images/${events._id}/${req.file.originalname}`;
      }
    
    const event=await events.save();
    res.status(200).json({message:"add Event succesfully"});

}))
const addClub=(expressAsyncHandler(async(req,res)=>{
    const clubs=new Clubs({
        name:req.body.name,
        desc:req.body.description,
    });
    if (req.file) {
        // Uploading the profile image to AWS S3
        await uploadImage(req.file);
  
        // Setting the cover image URL in the book model
        clubs.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profile-images/${clubs._id}/${req.file.originalname}`;
      }
    const res1=await clubs.save();
    console.log(res1);
    res.status(StatusCodes.OK).json({message:"club added succesfully"});
}));
const addCoordinator=(expressAsyncHandler(async(req,res)=>{
    const {roll}=req.body;
    const existingRegister=await Register.findOne({roll})
    if(existingRegister){
        const updatedUser=await Register.findOneAndUpdate({roll},{category:"Coordinator"},{new:true});
        console.log(updatedUser);
        return res.status(StatusCodes.OK).json({message:"Registered User updated as Coordinator"});
    }return res.status(StatusCodes.BAD_REQUEST).json({message:"User Not regisered"});
}))
const addAdmin=(expressAsyncHandler(async(req,res)=>{
    const{category,name,email,password,branch,year,section,rollno,admin}=req.body;
    console.log("admin",admin);
    const existingUser=await User.findOne({email})
    if(existingUser){
        const updateUser = await User.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
        console.log(updateUser);
        return res.status(StatusCodes.OK).json({message:"Existing user updated as admin"});
    }
    const newAdmin=new User({
        category:category,
        username:name,
        email:email,
        password:bcrypt.hashSync(password),
        branch:branch,
        year:year,
        section:section,
        rollno:rollno,
        isAdmin:admin,
    }) ;
    if(req.file){
        await uploadImage(req.file);
        newUser.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profile-images/${newUser._id}/${req.file.originalname}`;
    }
    const user=await newAdmin.save();
    return res.status(StatusCodes.CREATED).json({message:"admin added succesfully"});
}))
module.exports={getDetails,addEvent,addClub,addAdmin,addCoordinator};