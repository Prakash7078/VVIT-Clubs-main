const express=require("express");
const router = express.Router();
const {getDetails,addClub,addEvent, addAdmin, addCoordinator}=require("../controllers/adminControllers.js");
const isAuth=require('../middleware/auth');

router.get("/",isAuth,getDetails);
router.post("/addAdmin",isAuth,addAdmin);
router.post("/addCoordinator",isAuth,addCoordinator);
router.post("/addEvent",isAuth,addEvent);
router.post("/addClub",isAuth,addClub);

module.exports=router;