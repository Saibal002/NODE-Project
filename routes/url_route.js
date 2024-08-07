const express=require('express');
const {handleGenerateNewURL,handleGetAnalytics}=require('../controllers/url_ctrl');
const router=express.Router();

router.post("/",handleGenerateNewURL);
router.get('/analytics/:shortId',handleGetAnalytics);
module.exports=router;