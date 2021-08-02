const request=require("request");
const sd = "20-Jul-2021";
const ed = "22-July-2021";
let options = {
  //method: "POST",
  method:"GET",
  url: "https://dataservices.sypramsoftware.com/api/Product/GetSoldItemList",
  //url:"https://dataservices.sypramsoftware.com/api/Item/GetItemList",
  //url:"https://dataservices.sypramsoftware.com/api/Product/GetItem",
  //url: "https://dataservices.sypramsoftware.com/api/Product/ManageItem",
  // headers:{
  //   Authorization:'Basic '+Buffer.from("lRRqlkYefuV=:lRRqlkYefuV6jJ==:qzOUsBmZFgMDlwGtrgYypxUz").toString('base64'),
  //   /* Authorization:'Basic '+Buffer.from("MeCHHkZ9:tdypsA =:lqBZghxJgaVE").toString('base64') */
 
  // },
  headers:{
    UserId: "lRRqlkYefuV=",
    Password: "lRRqlkYefuV6jJ==",
    Pin: "qzOUsBmZFgMDlwGtrgYypxUz"
  },
  body:{
    STARTDATE: sd,
    ENDDATE: ed
  },
  //accept: "application/json",
  /* headers:{
    Authorization:'Basic '+Buffer.from("MeCHHkZ9:tdypsA =:lqBZghxJgaVE").toString('base64')
  }, */
  /*headers: {
    UserId:"lRRqlkYefuV=",
    Password:"lRRqlkYefuV6jJ==",
    Pin:"qzOUsBmZFgMDlwGtrgYypxUz"
  },*/
  /*headers: {
    UserId:"MeCHHkZ9",
    Password:"tdypsA =",
    Pin:"lqBZghxJgaVE"
  },*/
  /*body:{
    "UPC": "011433031370",
    "ITEMNAME": ""
  },*/
  /*body:{
    "BUYASCASE":"1",
    "CASEUNITS":"1",
    "CASECOST":"2.13",
    "UPC": "03520011111111111195928",
    "ITEMNAME": "Maggi Masala Noodles1",
    "DESCRIPTION": "Maggi Masala Noodles1",
    "PRICE": "1.13",
    "COST": "0.69",
    "SIZE": "70 gm",
    "PACK": "Single",
    "QTY": "16",
    "REPLACEQTY": 1,
    "DEPARTMENT": "GROSARY",
    "CATEGORY": "SNACKS",
    "SUBCATEGORY": "NOODLE",
    "ISFOODSTAMP": 1,
    "ISWEIGHTED": 0,
    "ISTAXABLE": 1,
    "VENDORNAME": "Test Grosary",
    "VENDORCODE": "T12456",
    "VENDORCOST": "0.70",
    "ISNEWITEM": 1
    },*/
  json: true,
};

function callback(error, response, body) {
  console.log(body)
}

request(options, callback);

/*
curl --location --request POST 'https://dataservices.sypramsoftware.com/api/Product/ManageItem' \
--header 'UserId: MeCHHkZ9' \
--header 'Password: tdypsA =' \
--header 'Pin: lqBZghxJgaVE' \
--data-raw '{
    "BUYASCASE":"1",
    "CASEUNITS":"1",
    "CASECOST":"2.13",
    "UPC": "03520011111111111195928",
    "ITEMNAME": "Maggi Masala Noodles1",
    "DESCRIPTION": "Maggi Masala Noodles1",
    "PRICE": "1.13",
    "COST": "0.69",
    "SIZE": "70 gm",
    "PACK": "Single",
    "QTY": "16",
    "REPLACEQTY": 1,
    "DEPARTMENT": "GROSARY",
    "CATEGORY": "SNACKS",
    "SUBCATEGORY": "NOODLE",
    "ISFOODSTAMP": 1,
    "ISWEIGHTED": 0,
    "ISTAXABLE": 1,
    "VENDORNAME": "Test Grosary",
    "VENDORCODE": "T12456",
    "VENDORCOST": "0.70",
    "ISNEWITEM": 1
}'

get single
curl --location --request GET 'https://dataservices.sypramsoftware.com/api/Product/GetItem' \
--header 'UserId: MeCHHkZ9' \
--header 'Password: tdypsA =' \
--header 'Pin: lqBZghxJgaVE' \
--data-raw '{
"UPC": "",
"ITEMNAME": "KORBEL BRUT"
}'
*/