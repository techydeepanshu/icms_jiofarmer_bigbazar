const fs =require('fs');
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const schemaOfProduct=new Schema({Item:String,Description:String,Quantity:String,Price:String,sku:String,category:String,POS:String,Barcode:String,PosSKU:String});
mongoose.connect("mongodb://verveuser:vervebot123@54.234.86.83/vervedb").then(res=>console.log("success")).catch(err=>console.log(err));
const dir="/home/dell/v/a/";
fs.readdir(dir+"new-model/",function(err,files){
  files.forEach(function(file){
    let name=file;
    name=name.substring(0,name.length-5);
    name=name.toLowerCase();
    name=name.replaceAll("-","");
    let json=require(dir+"new-model/"+file);
    let invoice=mongoose.model(name,schemaOfProduct);
    const convert=(json)=>{
      let data=[];
      for(var prop in json){
        if (Object.prototype.hasOwnProperty.call(json,prop)){
          data.push(json[prop]);
        }
      }
      return data;
    }
    let data=convert(json);
    invoice.insertMany(data,function(err,o){
      if(err)console.log(err)
      else console.log(name);
    })
  })
});