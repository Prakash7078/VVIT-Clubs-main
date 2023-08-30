const Clubs=require('../models/clubsModel');
const express=require('express');
const clubRouter=express.Router();
const getClubs=async(req,res)=>{
    const clubs=await Clubs.find({});
    res.send(clubs);
};
const getChooseclub=async(req,res)=>{
    const club=await Clubs.findOne({name:req.params.name});
    if(club){
        res.send(club);
    }
    else{
        res.status(404).send({message:'Product not Found'});
    }
};

module.exports={getChooseclub,getClubs};