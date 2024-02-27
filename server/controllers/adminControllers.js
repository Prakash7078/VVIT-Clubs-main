const express = require("express");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const Clubs = require("../models/clubsModel");
const bcrypt = require("bcryptjs");
const Event = require("../models/eventModel");
const data = require("../data");
const dotenv = require("dotenv");
const uploadImage = require("../middleware/uploadMiddleware");
const StatusCodes = require("http-status-codes");
const Register = require("../models/registerModel");
const Testimony = require("../models/testimonialModel");
const moment = require("moment-timezone"); // Import moment-timezone
const ClubRegister = require("../models/clubRegisterModel");

dotenv.config();
const getDetails = async (req, res) => {
  await User.deleteMany({});
  const createdUser = await User.create(data.users);

  res.send({ createdUser });
};
const deleteClubregister = expressAsyncHandler(async (req, res) => {
  const roll = req.params.rollno;
  console.log("roll", roll);
  const user1 = await User.updateOne(
    { rollno: roll },
    { category: "Student" },
    { new: true }
  );
  console.log("user", user1);
  await Register.deleteOne({ "eventregisteruser.rollno": roll });
  const clubreg = await ClubRegister.findOneAndDelete({
    "registeruser.rollno": roll,
  });
  res.status(StatusCodes.OK).json({
    message: `Remove ${clubreg.registeruser.username} from ${clubreg.club.name} succesfully`,
  });
  // const eventregister=await Register.findOne({roll:rollno});
  // if(eventregister){
  //     await Register.deleteOne({roll:rollno});
  // }
});
const addEvent = expressAsyncHandler(async (req, res) => {
  // const correctdate = moment(req.body.eventdate).utc().toDate();
  const correctdate = moment(req.body.eventdate).utc().toDate();
  console.log("correctdate", correctdate);
  const events = new Event({
    clubname: req.body.club,
    user: req.body.user,
    eventname: req.body.name,
    eventdate: correctdate,
    description: req.body.desc,
  });
  if (req.file) {
    // Uploading the profile image to AWS S3
    await uploadImage("events", req.file);

    // Setting the cover image URL in the book model
    events.eventimage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/events/${req.file.originalname}`;
  }

  const event = await events.save();
  console.log(event);
  res.status(200).json({ message: "add Event succesfully" });
});

const deleteEvent = expressAsyncHandler(async (req, res) => {
  await Register.deleteMany({ "event._id": req.params.id });
  await Event.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: "event delete succesfully" });
});

const updateEvent = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  const newReg = await Register.find({ "event._id": id });
  console.log("new Reg", newReg);
  if (newReg.length > 0) {
    for (const reg of newReg) {
      const updateReg = await Register.findByIdAndUpdate(reg._id, {
        clubname: req.body.club,
        "event.clubname": req.body.club,
        "event.eventname": req.body.name,
        "event.eventdate": req.body.eventdate,
        "event.description": req.body.desc,
      });
      if (req.file) {
        await uploadImage("events", req.file);
        updateReg.event.eventimage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/events/${req.file.originalname}`;
      }
      await updateReg.save();
    }
  }
  const newOne = await Event.findByIdAndUpdate(id, {
    clubname: req.body.club,
    eventname: req.body.name,
    eventdate: req.body.eventdate,
    description: req.body.desc,
  });
  if (req.file) {
    await uploadImage("events", req.file);
    newOne.eventimage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/events/${req.file.originalname}`;
  } else {
    newOne.image = req.body.image;
  }
  await newOne.save();
  console.log(newOne);
  return res
    .status(StatusCodes.OK)
    .json({ message: "Event updated succesfully" });
});

const updateClub = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  const newReg = await ClubRegister.find({ "club._id": id });
  if (newReg.length > 0) {
    for (const reg of newReg) {
      const updateReg = await ClubRegister.findByIdAndUpdate(reg._id, {
        "club.name": req.body.name,
        "club.desc": req.body.desc,
      });
      if (req.file) {
        await uploadImage("clubs", req.file);
        updateReg.club.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/clubs/${req.file.originalname}`;
      }
      await updateReg.save();
    }
  }
  const newOne = await Clubs.findByIdAndUpdate(
    id,
    { name: req.body.name, desc: req.body.desc },
    { new: true }
  );
  if (req.file) {
    await uploadImage("clubs", req.file);
    newOne.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/clubs/${req.file.originalname}`;
  } else {
    newOne.image = req.body.image;
  }
  newOne.save();
  console.log("newOne", newOne);
  return res
    .status(StatusCodes.OK)
    .json({ message: "club update succesfully" });
});
// const addTestimony=(expressAsyncHandler(async(req,res)=>{
//     console.log("profileData",req.body);
//     const {name,position,desc}=req.body;
//     const testimonial=new Testimony({
//         name:name,
//         position:position,
//         desc:desc,
//     });
//     if(req.file){
//         await uploadImage("admins",req.file);
//         testimonial.profile=`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/admins/${req.file.originalname}`;
//     }
//     const test1=await testimonial.save();
//     console.log(test1);
//     return res.status(StatusCodes.OK).json({message:"Testimonial added succesfully"});
// }));
const addClub = expressAsyncHandler(async (req, res) => {
  const clubs = new Clubs({
    user: req.body.user,
    name: req.body.name,
    desc: req.body.desc,
  });
  if (req.file) {
    // Uploading the profile image to AWS S3
    await uploadImage("clubs", req.file);

    // Setting the cover image URL in the book model
    clubs.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/clubs/${req.file.originalname}`;
  }
  const res1 = await clubs.save();
  console.log(res1);
  return res.status(StatusCodes.OK).json({ message: "club added succesfully" });
});
const addTestimony = expressAsyncHandler(async (req, res) => {
  const testimonial = new Testimony({
    name: req.body.name,
    position: req.body.position,
    desc: req.body.desc,
  });
  if (req.file) {
    await uploadImage("admins", req.file);
    testimonial.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/admins/${req.file.originalname}`;
  }
  const res1 = await testimonial.save();
  console.log(res1);
  return res
    .status(StatusCodes.OK)
    .json({ message: "Testimonial added succesfully" });
});

const deleteClub = async (req, res) => {
  console.log("delete id", req.params.id);
  const club = await Clubs.findById(req.params.id);
  await Register.deleteMany({ club: club });
  await Event.deleteMany({ club: club });
  const result = await Clubs.findByIdAndDelete(req.params.id);
  res.json({ message: "Club deleted succesfully" });
};

// const addCoordinator=(expressAsyncHandler(async(req,res)=>{
//     const {roll}=req.body;
//     const existingRegister=await Register.findOne({roll})
//     if(existingRegister){
//         const updatedUser=await Register.findOneAndUpdate({roll},{category:"Coordinator"},{new:true});
//         console.log(updatedUser);
//         return res.status(StatusCodes.OK).json({message:"Registered User updated as Coordinator"});
//     }return res.status(StatusCodes.BAD_REQUEST).json({message:"User Not regisered"});
// }))
const addAdmin = expressAsyncHandler(async (req, res) => {
  const {
    category,
    name,
    email,
    password,
    branch,
    year,
    section,
    rollno,
    admin,
  } = req.body;
  console.log("admin", admin);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const updateUser = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );
    console.log(updateUser);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Existing user updated as admin" });
  }
  const newAdmin = new User({
    category: category,
    username: name,
    email: email,
    password: bcrypt.hashSync(password),
    branch: branch,
    year: year,
    section: section,
    rollno: rollno,
    isAdmin: admin,
  });
  if (req.file) {
    await uploadImage(req.file);
    newUser.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profile-images/${newUser._id}/${req.file.originalname}`;
  }
  const user = await newAdmin.save();
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "admin added succesfully" });
});
module.exports = {
  getDetails,
  deleteClubregister,
  addEvent,
  addClub,
  addAdmin,
  updateClub,
  updateEvent,
  deleteClub,
  deleteEvent,
  addTestimony,
};
