const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amma@1982@bala",
    database:"balagowda",
  });

db.connect(function(err){
    if(err) throw err;
    /* console.log("connection successfull"); */
});

app.get("/",function(req,res){
    res.render("index");
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.post("/submit",function(req,res){
    let data = req.body.table;
    res.redirect("/"+data); 
});

app.get("/:targetRouteName",function(req,res){
    let Name = req.params.targetRouteName;
    db.query("select * from "+Name,(err,result,feilds)=>{
        if(err) throw err;
        res.render(Name,{res:result});
    }); 
});

app.post("/insertStudent",function(req,res){
    let name = req.body.table;
    db.query("insert into "+name+" values("+req.body.id+",'"+req.body.name+"'"+","+req.body.age+",'"+req.body.country+"'"+","+req.body.mob+");",(err,result,feilds)=>{
        if(err) throw err;
        console.log(result);
    });
    res.redirect("/"+name);
});

app.post("/deleteStudent",function(req,res){
    let name = req.body.table;
    db.query("delete from "+name+" where student_id="+req.body.id+" and student_name='"+req.body.name+"'",(err,result,feilds)=>{
        if(err) throw err;
        console.log(result);
    });
    res.redirect("/"+name);
});

app.post("/editStudent",function(req,res){
    let name = req.body.table;
    db.query("update "+name+" set student_age="+req.body.age+",student_name='"+req.body.name+"'"+",student_mob="+req.body.mob+",student_country='"+req.body.country+"'"+" where student_id="+req.body.id,(err,result,feilds)=>{
        if(err) throw err;
        console.log(result);
    });
    res.redirect("/"+name);
});

app.post("/insertDetails",function(req,res){
    let name = req.body.table;
    db.query("insert into "+name+" values("+req.body.id+","+req.body.age+",'"+req.body.result+"'"+",'"+req.body.rank+"'"+");",(err,result,feilds)=>{
        if(err) throw err;
        console.log(result);
    });
    res.redirect("/"+name);
});

app.post("/deleteDetails",function(req,res){
    let name = req.body.table;
    db.query("delete from "+name+" where student_id="+req.body.id+" and student_age="+req.body.age,(err,result,feilds)=>{
        if(err) throw err;
        console.log(result);
    });
    res.redirect("/"+name);
});

app.post("/editDetails",function(req,res){
    let name = req.body.table;
    db.query("update "+name+" set student_age="+req.body.age+",student_result='"+req.body.result+"'"+",student_rank='"+req.body.rank+"'"+" where student_id="+req.body.id,(err,result,feilds)=>{
        if(err) throw err;
        console.log(result);
    });
    res.redirect("/"+name);
});

app.listen(3000,function(){
    console.log("Server started");
});