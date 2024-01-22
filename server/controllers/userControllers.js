const express=require('express');
const User=require('../models/userModel');

const getUsers=async(req,res)=>{
    const result=await User.findOne({rollno:req.params.rollno});
    res.send(result);
};
module.exports=getUsers;