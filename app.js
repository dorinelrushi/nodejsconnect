const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/ninjago",{ useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('error',function(error){
    console.log('error',error)
})

db.once('open',()=>{
    console.log("mongodb connected")
})


const app = express();

app.use('/public',express.static(path.join(__dirname,'public')))

const Ninja = require('./models/Schema')



app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.set('view engine','ejs');

app.get("/",(req,res)=>{
   Ninja.find({},function(err,article){
       res.render('home',{article : article})
   })
})
app.get("/add",(req,res)=>{
    res.render("add")
})

app.get("/update/",(req,res)=>{
    res.render("save")
})


app.get("/update/:id",(req,res)=>{
    res.render("save",  {id : req.param.id})
})

app.post("/posted/:id",(req,res)=>{
 
  let article = {}
  article.title  = req.body.title;

  let query = {article : req.params.id}

  Ninja.updateOne(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
})

app.post("/postit",(req,res)=>{
    let article = new Ninja();
   article.title  = req.body.title;
   article.describe = req.body.describe;

   article.save(function(err){
       if(err){
           console.log(err);
       }else{
           res.redirect('/')
       }
   })
})
app.listen(3000,()=>{
    console.log("server on port 3000");
})