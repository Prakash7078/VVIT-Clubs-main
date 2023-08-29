const express=require("express");
const router = express.Router();
const isAuth=require('../middleware/auth');
const { login, signup, profile }=require("../controllers/authController.js");

router.post("/login", login);
router.post("/signup", signup);
router.patch("/profile",isAuth,profile);

module.exports=router;