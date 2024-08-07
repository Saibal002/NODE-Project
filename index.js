const express= require('express');
const urlRoute=require('./routes/url_route');
const staticRouter=require('./routes/staticRouter');
const path=require('path');
const {connectToMongoDB}=require('./connect_db');
const URL=require('./models/url');
const app=express();
const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/short_id').then(()=>console.log('Mongo DB is Connected'));

app.listen(PORT,()=>console.log(`Server Started at port:',${PORT}`));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use("/url",urlRoute);
app.use('/',staticRouter);
//setting the view engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//-------------if we don't use ejs,we have to do like this------//

app.get("/allEntry",async(req,res) => {
    const allUrls = await URL.find({});
    return res.end(`
        <html>
            <head>

            </head>
            <body>
                <ol>
                    ${allUrls.map(url=>`<li>${url.shortId}-${url.redirectURL}-${url.visitHistory.length}</li>`).join('')}
                </ol>
            </body>
        </html>
    `)
})

// app.get("/test",async(req,res) => {
//     const allUrls = await URL.find({});
//     return res.render('allurl',{
//         urls:allUrls,
//     })
// })



app.get('/url/:shortID',async (req,res)=>{
    const shortId=req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {shortId,},
        {
            $push:{
                visitHistory: {
                    timestamp:Date.now()
                },
            },
        }
    )
   res.redirect(entry.redirectURL)    
});
