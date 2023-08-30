const express=require('express');
const { getClubs, getChooseclub} = require('../controllers/clubControllers');
const isAuth = require('../middleware/auth');
const router=express.Router();

router.get('/',getClubs);
router.get('/name/:name',getChooseclub);
module.exports=router;