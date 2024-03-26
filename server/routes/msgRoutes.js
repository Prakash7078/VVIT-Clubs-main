const express=require("express");
const router = express.Router();
const { getMessages, getUsermsg, sendMsg, deleteMessages, getNotifications, getUnseenNotifications,updateNotificationStatus } = require("../controllers/msgController.js");
const isAuth=require('../middleware/auth');

router.get("/messages",isAuth,getMessages);
router.get("/notifications/:rollno",getNotifications);
router.get("/notifications/unseen/:rollno",getUnseenNotifications);
router.put("/notifications/status/:id",updateNotificationStatus);
router.get('/:rollno',getUsermsg);
router.post('/send',sendMsg);
router.delete("/remove/:id",isAuth,deleteMessages);

module.exports=router;