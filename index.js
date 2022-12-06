const express = require('express');
const bodyparser = require("body-parser");
const Multer = require('multer');
const app = express();
//app.use(bodyparser.json());
//query api
app.post("/",function(req,res){
    let firstName = req.query.firstName;
    let midName = req.query.midName;
    let lastName = req.query.lastName;
    res.end(firstName + " " + midName + " " + lastName );
})
//header  api
app.post("/header",function(req,res){
    let firstName = req.header("firstName");
    let midName=req.header("midName");
    let lastName = req.header("lastName");
    res.end(firstName + " "+ midName + " " + lastName);
})
//data pass body post method api
app.use(bodyparser.json());
app.post("/body",function(req,res){
    let JSONData = req.body;
    let JSONString = JSON.stringify(JSONData);
    res.send(JSONString);
});
//download api
app.post("/down",function(req,res){
    res.download("./download/pro.jpg");
});
//upload api 
var storage =  Multer.diskStorage({
    destination:function(req,file,callBack){
        callBack(null,'./upload');
    },
    filename:function(req,file,callBack){
        callBack(null,file.originalname);
    }
});
var upload = Multer({storage:storage}).single('myfile');
app.post("/up",function(req,res){
    upload(req,res,function(error){
        if(error){
            console.log("upload unsuccess");
        }
        else{
            console.log("upload success");
        }
    });
});

app.listen(2050,()=>{
    console.log("server is runing");
})