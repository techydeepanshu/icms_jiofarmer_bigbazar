var express = require("express");
var request = require("request");
var cors = require("cors");
var bodyParser=require("body-parser");
const textractHelper = require('aws-textract-helper');
require("dotenv").config({ path: __dirname + "/.env" });
var app = express();
var corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
if(process.env.NODE_ENV === "production")
  app.use(express.static(__dirname.substring(0, __dirname.indexOf("/serverside")) + "/clientside/build"));
app.use(bodyParser.json({limit: '3mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '3mb', extended: true,useNewUrlParser:true}))
app.post("/upload",function(req,res){
  //write authorization logic here also uid=user id below
  let uid="qwerty";
  let ext=req.body.ext;
  let base64=req.body.base64;
  let ts=req.body.ts;
  let imageId=uid+ts.toString();
  let options = {
    method: "POST",
    url: process.env.url+"/upload",
    headers: {"x-api-key": process.env.API_SECRET},
    body:{"img":base64,"fileExt":ext,"imageID":imageId},
    json: true,
  };
  function callback(error, response, body) {
    if(error===null)res.json(body);
    else res.json({statusCode:404});
  }
  request(options, callback);
});
app.post("/ocr",function(req,res){
  //write authorization logic here also uid=user id below
  let uid="qwerty";
  let ext=req.body.ext;
  let ts=req.body.ts;
  let imageId=uid+ts.toString()+"."+ext;
  let options = {
    method: "POST",
    url: process.env.url+"/ocr",
    headers: {"x-api-key": process.env.API_SECRET},
    body:imageId,
    json: true,
  };
  function callback(error, response, body) {
    if(error!==null) res.json({statusCode:404});
    let dataFromTextract=body.body;
    const tables = textractHelper.createTables(dataFromTextract);
    let obj={statusCode:200,body:tables}
    res.json(obj)
  }
  request(options, callback);
});
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});