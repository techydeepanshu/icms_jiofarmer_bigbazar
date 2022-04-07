
const {execSync} = require("child_process");
const csv=require('csvtojson')
require("dotenv").config({ path:"../.env" });
const axios = require("axios");
const syncProductsWithPos = (req, res) =>{

  try{
   
  const childJsonCsv = execSync("node ./sync_products/json-csv.js"
  )
  console.log("response form jsoncsv file : ",childJsonCsv.toString())
  const childPython = execSync("python ./generator/main1.py")
  console.log("response form main1.py file : ",childPython.toString())

  // const childJsonCsv = execSync("node ./json-csv.js")
  // console.log("response form jsoncsv file : ",childJsonCsv.toString())
  // const childPython = execSync("python ../generator/main1.py")
  // console.log("response form main1.py file : ",childPython.toString())
  
  
  let fileInputName ='./csv/Hicksville.csv'; 
  // let fileInputName ='../csv/Hicksville.csv'; 
  // let fileOutputName = 'myOutputFile.json';
  
  // csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
  // let json = csvToJson.getJsonFromCsv(fileInputName);
  // for(let i=0; i<json.length;i++){
    //     console.log(json[i]);
    // }
    
    csv()
    .fromFile(fileInputName)
    .then(async(jsonObj)=>{

      console.log(jsonObj);
      try{

        await axios.delete(`http://${process.env.MONGO_IP}:3001/removehicksvilledata`).then(async(removeHicksville)=>{

          console.log("removeHicksville : ", removeHicksville.data);
          // const linkinglogs = removeHicksville.data;
          
          await axios.post(`http://${process.env.MONGO_IP}:3001/insertnewhicksvilledata`,jsonObj).then((insertNewHicksvilleData)=>{

            console.log("insertNewHicksvilleData : ", insertNewHicksvilleData.data);
            res.json({success:true})
          }).catch((err)=>{
            console.log("err occurred in insertNewHicksvilleData",err)
            res.send({success:false})
          })

        }).catch((err)=>{
          console.log("err occurred in removeHicksville",err)
          res.send({success:false})
        })
        
      }catch(err){
        console.log("err : ",err)
        res.send({success:false})
      }

    })
  }catch(err){
    console.log("&&&& ",err)
    // res.error(err)
    res.json({success:false})
  }

  }
  // syncProductsWithPos()
  module.exports = syncProductsWithPos;