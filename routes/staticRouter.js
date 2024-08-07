const express=require('express');
const URL=require('../models/url');
const router=express.Router();
router.get("/",(req,res)=>
{   const allurls= awaitURL.find({})
    res.render('homepage',{
        urls:allurls,
    })
})

module.exports= router;