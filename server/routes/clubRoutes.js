const express=require('express');
const { getClubs, getChooseclub } = require('../controllers/clubControllers');
const router=express.Router();

router.get('/',getClubs);
router.get('/name/:name',getChooseclub);
module.exports=router;