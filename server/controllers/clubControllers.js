const { StatusCodes } = require("http-status-codes");
const ClubRegister = require("../models/clubRegisterModel");
const Clubs = require("../models/clubsModel");
const User = require("../models/userModel");
const express = require("express");
const { sendMail } = require("../middleware/sendMail");
const clubRouter = express.Router();
const getClubs = async (req, res) => {
  const clubs = await Clubs.find({});
  res.send(clubs);
};
const getClubRegisters = async (req, res) => {
  const registers = await ClubRegister.find({});
  return res.status(StatusCodes.OK).send(registers);
};
const updateUserregister = async (req, res) => {
  const rollno = String(req.params.roll);
  const newOne = await ClubRegister.findOneAndUpdate(
    { "registeruser.rollno": rollno },
    {
      "registeruser.category": req.body.category,
      "club.user.category": req.body.category,
    },
    { new: true }
  );
  const newUser = await User.findOneAndUpdate(
    { rollno: rollno },
    { category: req.body.category },
    { new: true }
  );
  console.log("newone", newOne);
  console.log("newone", newUser);
  res
    .status(StatusCodes.OK)
    .json({ message: "Coordination changed succesfully" });
};
const clubRegister = async (req, res) => {
  const { club, user } = req.body.data;
  const res1 = await ClubRegister.findOne({ "user._id": user._id });
  const user1 = await User.findOne({ rollno: user.rollno });
  if (res1) {
    console.log(res1);
    return res.json({
      error: true,
      message: `You already registered for ${res1.club.name} club`,
    });
  }
  const result = await ClubRegister({
    club: club,
    registeruser: user,
  });
  await result.save();
  await sendMail(
    user1.email,
    `You succesfully registered in ${club.name} club. From now onwards you are a member of ${club.name} club. If u want to change club you can mail ur rollno to vvitclubs7078@gmail.com`
  );
  return res
    .status(StatusCodes.OK)
    .json({ message: "Club Registration succesfully" });
};
const getChooseclub = async (req, res) => {
  const club = await Clubs.findOne({ name: req.params.name });
  if (club) {
    res.send(club);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
};

module.exports = {
  getChooseclub,
  getClubs,
  clubRegister,
  getClubRegisters,
  updateUserregister,
};
