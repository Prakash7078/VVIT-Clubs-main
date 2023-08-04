const express=require('express');
const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const { generateToken }=require('../middleware/utils');
const expressAsyncHandler=require('express-async-handler');
const uploadImage = require('../middleware/uploadMiddleware');
const userRoutes=express.Router();
const dotenv=require('dotenv');
dotenv.config();
userRoutes.get('/:rollno',async(req,res)=>{
    const result=await User.find({rollno:req.params.rollno});
    res.send(result);
});
const login=(expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.data.email});
    if(user){
        if(bcrypt.compareSync(req.body.data.password,user.password)){
            const token=generateToken(user);
            res
            .status(201)
            .json({token, user});
            return ;
        }
    }
    res.status(401).send({message:'invalid Password or Email'});
    
}));
const signup=(expressAsyncHandler(async(req,res)=>{
    const{category,name,email,password,branch,year,section,rollno,admin}=req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser=new User({
     category:category,
     username:name,
     email:email,
     password:bcrypt.hashSync(password),
     branch:branch,
     year:year,
     section:section,
     rollno:rollno,
     isAdmin:admin,
    });
    if(req.file){
        await uploadImage(req.file);
        newUser.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profile-images/${newUser._id}/${req.file.originalname}`;
    }
    const token=generateToken(newUser);
    const user=await newUser.save();
    res
      .status(201)
      .json({token, user});
}));
module.exports = {login,signup};