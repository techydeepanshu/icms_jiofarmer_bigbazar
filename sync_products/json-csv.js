const request=require("request");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require("dotenv").config({ path:"../.env" });
const csvWriter = createCsvWriter({
  // path: 'Data.csv',
  path: './csv/Maharaja_Hicksville.csv',
  // path: '../csv/Maharaja_Hicksville.csv',
  header: [
    {id:"UPC",title:"UPC"},
    {id:"SKU",title:"SKU"},
    {id:"ItemName",title:"ItemName"},
    {id:"Price",title:"Price"},
    {id:"Cost",title:"Cost"},
    {id:"SALEPRICE",title:"SALEPRICE"},
    {id:"SizeName",title:"SizeName"},
    {id:"PackName",title:"PackName"},
    {id:"Vintage",title:"Vintage"},
    {id:"Department",title:"Department"},
    {id:"PriceA",title:"PriceA"},
    {id:"PriceB",title:"PriceB"},
    {id:"PriceC",title:"PriceC"},
    {id:"TotalQty",title:"TotalQty"},
    {id:"ALTUPC1",title:"ALTUPC1"},
    {id:"ALTUPC2",title:"ALTUPC2"},
    {id:"STORECODE",title:"STORECODE"}
  ]
});
let options = {
  method: "GET",
  url: `${process.env.POS_API}/getdata/ProductInfo`,
//   headers:{
//     Authorization:'Basic '+Buffer.from("lRRqlkYefuV=:lRRqlkYefuV6jJ==:qzOUsBmZFgMDlwGtrgYypxUz").toString('base64')
//   },
  json: true,
};
function callback(error, response, body) {
  // console.log("this is error : ",error);
  // console.log("this is response : ",response);
  // console.log("this is body : ",body);
  let data=body.Data;
  csvWriter.writeRecords(data).then(()=> console.log('Success'));
}
request(options, callback);