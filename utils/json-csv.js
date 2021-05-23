const request=require("request");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'Data.csv',
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
  url:"https://dataservices.sypramsoftware.com/api/Item/GetItemList",
  headers:{
    Authorization:'Basic '+Buffer.from("lRRqlkYefuV=:lRRqlkYefuV6jJ==:qzOUsBmZFgMDlwGtrgYypxUz").toString('base64')
  },
  json: true,
};
function callback(error, response, body) {
  let data=body.Data;
  csvWriter.writeRecords(data).then(()=> console.log('Success'));
}
request(options, callback);