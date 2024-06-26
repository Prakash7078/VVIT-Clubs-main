const express = require("express");
const Event = require("../models/eventModel");
const expressAsyncHandler = require("express-async-handler");
const Register = require("../models/registerModel");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const ClubRegister = require("../models/clubRegisterModel");
const { sendMail } = require("../middleware/sendMail");

const getClubevents = async (req, res) => {
  const event = await Event.find({});
  res.status(StatusCodes.OK).json({ events: event });
};

const getClubregistrations = async (req, res) => {
  const registers = await Register.find({});
  res.status(200).json({ registers });
};
const updateRunner = async (req, res) => {
  const rollno = String(req.params.roll);
  const exist = await Register.findOne({ "eventregisteruser.rollno": rollno });
  if (exist.isWinner) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Runner changed unsuccesfully" });
    return;
  }
  const newOne = await Register.findOneAndUpdate(
    { "eventregisteruser.rollno": rollno },
    { isRunner: req.body.isRunner },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ message: "Runner changed succesfully" });
};
const updateWinner = async (req, res) => {
  try {
    const rollno = String(req.params.roll);
    const exist = await Register.findOne({
      "eventregisteruser.rollno": rollno,
    });
    if (exist.isRunner) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Winner changed unsuccesfully" });
      return;
    }
    const newOne = await Register.findOneAndUpdate(
      { "eventregisteruser.rollno": rollno },
      { isWinner: req.body.isWinner },
      { new: true }
    );
    console.log(newOne);
    res.status(StatusCodes.OK).json({ message: "Winner changed succesfully" });
  } catch (err) {
    console.log(err);
  }
};

const eventRegistration = expressAsyncHandler(async (req, res) => {
  const { clubname, event, userInfo } = req.body;
  try {
    //Here first we are checking user registers list and after check club registartion for event register.
    const rollnum = await Register.findOne({
      "eventregisteruser.rollno": userInfo.rollno,
    });
    const user1 = await User.findOne({ rollno: userInfo.rollno });
    const event1 = await Event.findOne({ _id: event._id });
    if (rollnum) {
      res.json({
        error: true,
        message: `You already registered for ${rollnum.event.eventname} event`,
      });
      return;
    }
    const reg = await ClubRegister.findOne({
      "registeruser.rollno": userInfo.rollno,
      "club.name": clubname,
    });
    if (!reg) {
      res.json({
        error: true,
        message: `You need to register for ${clubname} club`,
      });
      return;
    }
    const newRegister = new Register({
      clubname: clubname,
      event: event,
      eventregisteruser: userInfo,
      isWinner: false,
      isRunner: false,
    });
    const res1 = await newRegister.save();
    console.log("response", res1);
    await sendMail(
      user1.email,
      `You succesfully registered for ${event.eventname} event of ${clubname} club. The event is scheduled at ${event1.eventdate}.`
    );
    res.send(res1);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
const deleteUserregister = async (req, res) => {
  const result = await Register.deleteOne({
    "eventregisteruser.rollno": req.params.rollno,
  });
  res.status(200).json({ message: "registration delete succesfully" });
};
module.exports = {
  getClubevents,
  getClubregistrations,
  eventRegistration,
  deleteUserregister,
  updateWinner,
  updateRunner,
};
