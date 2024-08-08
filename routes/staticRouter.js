const express=require('express');
const URL=require('../models/url');
const router=express.Router();
router.get("/",async (req,res)=>
{   const allurls= await URL.find({});
    res.render('homepage',{
        urls:allurls,
    })
})

module.exports= router;