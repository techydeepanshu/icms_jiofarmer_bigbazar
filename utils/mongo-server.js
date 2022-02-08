const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const authString = true
  ? "MeCHHkZ9:tdypsA =:lqBZghxJgaVE"
  : "lRRqlkYefuV=:lRRqlkYefuV6jJ==:qzOUsBmZFgMDlwGtrgYypxUz";
const consolere = require('console-remote-client').connect({server: 'https://console.re', channel: 'icms'});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
mongoose
  .connect("mongodb://verveuser:vervebot123@34.202.27.217/vervedb")
  .then((res) => console.log("success connecting to mongo"))
  .catch((err) => console.log(err));
const Schema = mongoose.Schema;
const posSchema = new Schema({
  SKU: String,
  UPC: String,
  ALTUPC1: String,
  ALTUPC2: String,
  ItemName: String,
  Vintage: String,
  TotalQty: String,
  Cost: String,
  PriceA: String,
  PriceB: String,
  PriceC: String,
  Department: String,
  SALEPRICE: String,
  SizeName: String,
  PackName: String,
  Price: String,
  STORECODE: String,
  soldQty: { type: String, default: "0" },
  wordpressSoldQty: { type: String, default: "0" },
  invoiceQty: { type: String, default: "0" },
}); 
let pos = mongoose.model("pos", posSchema);
const invoiceSchema = new Schema({
  Item: String,
  Description: String,
  Quantity: String,
  Price: String,
  sku: String,
  category: String,
  POS: String,
  Barcode: String,
  PosSKU: String,
  isReviewed: String,
  Size: String,
  Department: String,
  SellingPrice: String,
  SellerCost: String,
  Details: String,
  LinkingCorrect: String,
});
const notFoundSchema = new Schema({
  Item: String,
  Description: String,
  Quantity: String,
  Price: String,
  sku: String,
  Barcode: String,
  PosSKU: String,
  InvoiceName: String,
} );
let notFound = mongoose.model("notfounds", notFoundSchema);

const hicksvilleSchema = new Schema({


 val: String,
 name: String
});
let hicksvilleData = mongoose.model("hicksvilles", hicksvilleSchema);

const scanInvoiceDataSchema  = new Schema({
  InvoiceName: String,
  InvoiceData: { type: Array, default: []},
  SavedDate: String,
  SavedInvoiceNo: String
});
let scanInvoiceData = mongoose.model("scaninvoicedatas", scanInvoiceDataSchema);

const logItemSchema = new Schema({
  InvoiceDescription: String,
  PosDescription: String,
  SKU: String,
  Barcode: String,
  InvoiceName: String,
  ItemCode: String,
  LinkingDate: String,
  PersonName: String,
  Size: String,
  PosUnitCost: String,
  PosUnitPrice: String,
  InvoiceNo: String,
  InvoiceDate: String,
  Department: String,
  CostIncrease: String,
  CostDecrease: String,
  CostSame: String,
  Unidentified: {type: String, default: ""},
  InvUnitCost: String,
  TimeStamp: {type: String, default: new Date().toTimeString().split(" ")[0] },
  NotFoundPos: {type: String, default: ""},
  InvError: {type: String, default: ""}

});
let logItemData = mongoose.model("linkinglogs", logItemSchema);


const posLogItemSchema = new Schema({
  InvoiceName: String,
  InvoiceDate: String,
  ItemNo: String,
  InvoiceDescription: String,
  PosDescription: String,
  PosUnitCost: String,
  PosUnitPrice: String,
  OldMarkup: String,
  InvUnitCost: String,
  InvUnitPrice: String,
  NewMarkup: String,
  UpdateDate: String,
  Person: String,
  TimeStamp: String,
  HandWritten: {type: String, default: ""},
  InvCaseCost: String,
  InvUnitsInCase: String,
  SKU: String
})
const posLogModel = mongoose.model("poslogs", posLogItemSchema);


// const handwrittenInvoiceSchema = new Schema({
//   InvoiceName: String,
//   ItemName: String,
//   POS: String,
//   PosSKU: String,
//   Size: String,
//   Department: String,
//   SellerCost: String,
//   SellingPrice: String,
//   NewUnitCost: String,
//   NewUnitPrice: String,
// });
// let handwrittenLog = mongoose.model("handwrittenlogs", handwrittenInvoiceSchema); 

//added by Deepanshu
const handwittenInvoiceSchema = new Schema({
  barcode:String,
  cost:String,
  department:String,
  description:String,
  details:String,
  extendedPrice:String,
  isReviewed:String,
  isUpdated:String,
  isUpdatedDate:String,
  itemNo:String,
  itemNoPresent:String,
  linkingCorrect:String,
  margin:String,
  markup:String,
  pieces:String,
  posName:String,
  posSku:String,
  price:String,
  priceIncrease:String,
  qty:String,
  sellingPrice:String,
  show:String,
  size:String,
  sku:String,
  unitPrice:String,
})

const handwrittenInvoiceLogSchema = new Schema({
  // InvoiceName: String,
  // ItemName: String,
  // POS: String,
  // PosSKU: String,
  // Size: String,
  // Department: String,
  // SellerCost: String,
  // SellingPrice: String,
  // NewUnitCost: String,
  // NewUnitPrice: String,
  InvoiceName: String,
  InvoiceDate: String,
  ItemNo: String,
  InvoiceDescription: String,
  PosDescription: String,
  OldUnitCost: String,
  OldUnitPrice: String,
  OldMarkup: String,
  NewUnitCost: String,
  NewUnitPrice: String,
  NewMarkup: String,
  UpdateDate: String,
  Person: String,
  TimeStamp: String,
  HandWritten: {type: String, default: ""},
  InvCaseCost: String,
  InvUnitsInCase: String,
  SKU: String
});
let handwrittenPosLog = mongoose.model("handwrittenposlogs", handwrittenInvoiceLogSchema); 




function convertArrayOfObjectIntoObject(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) obj[arr[i].Item] = arr[i];
  return obj;
}
app.get("/invoice/:name", (req, res) => {
  let invoice = mongoose.model(req.params.name, invoiceSchema);
  invoice.find({}, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else {
      if (x.length === 0) res.json(null);
      else res.json(convertArrayOfObjectIntoObject(x));
    }
  });
});

app.get("/invoice/getitemhandwritten",(req, res) => {
  console.log(req.body);
  let invoice = mongoose.model(req.params.name, invoiceSchema);
  console.log(invoice);
  invoice.find({}, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else {
      if (x.length === 0) res.json(null);
      else res.json(x);
    }
  })
  
})

app.put("/invoice/:name/:Item", (req, res) => {
  let invoice = mongoose.model(req.params.name, invoiceSchema);
  console.log(invoice);
console.log(req.params.Item);
  invoice.findOne({ Item: req.params.Item }, (err, x) => {
	console.log("IN FINDONE");
	console.log(err);
	console.log(x);
    if (err) res.json("Some error occured")
    else if (x === null){
	let obj = req.body;
         obj["Item"] = req.params.Item; 
	console.log("OBJECT");
	console.log(obj);
          invoice.insertMany( obj, (err, x) => {
            if(err) res.json("Some error occured.");
            else res.json("Product created Successfully.");
		 });
}
    else {
	console.re.log("remote log test 3");
      let obj = req.body;
      obj["Item"] = req.params.Item;
      invoice.updateOne({ Item: req.params.Item }, obj, (err, x) => {
        if (err) res.json("Some error occured.");
        else res.json("Product updated xxxxx");
      });
    }
  });
});
app.get("/notfound", (req, res) => {
  notFound.find({}, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
  });
});
app.post("/notfound", (req, res) => {
  let obj = req.body;
  notFound.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});
app.get("/getsaveinvoicedata/", (req, res) => {
  scanInvoiceData.find({
	InvoiceName: req.body.invoice,
	SavedInvoiceNo: req.body.invoiceNo,
	SavedDate: req.body.date
	 }, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
  });
});

app.get("/getsavedinvoices/", (req, res) => {
 	
	const invoice = req.body.invoice;
	console.log(invoice);
	console.log(invoice.slug);
  scanInvoiceData.find({InvoiceName: invoice.slug}, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
  });
});

app.get("/gethicksvilledata/", (req, res) => {
  const  arr = req.body.string.split(" ");
 // console.log(arr);
  const regex = arr.join("|");
 // console.log(regex);
  const data = [];

  
   hicksvilleData.find({name : { "$regex": req.body.string, "$options": "i" }
                       }, { _id: 0, __v: 0 }, (err, x) => {
     if (err) res.json("Some error occured");
     else{
         //console.log(x);
          //res.json(x);
         data.push(x);
         res.json(x);
         }
   });
  
 // console.log(data);
  // res.json(data);
 });

//app.get("/gethicksvilledata/", (req, res) => {
// const  arr = req.body.string.split(" ");
// console.log(arr);
// const regex = arr.join("|");
// console.log(regex);
// const data = [];
// console.log(arr.length);
// if(arr.length == 1){
//  console.log("1");
//  hicksvilleData.find({"$and": [ 
//                      {
 //                       name : { "$regex": arr[0] }
//                      }]}
//                , { _id: 0, __v: 0 }, (err, x) => {
//    if (err) res.json("Some error occured");
//    else res.json(x);
//  });
// }

//if(arr.length == 2){
//  console.log("2");
//  hicksvilleData.find({"$and": [ 
//                      {
//                        name : { "$regex": arr[0] },
//			name : {"$regex": arr[1]}
//                      }]}
//                , { _id: 0, __v: 0 }, (err, x) => {
//    if (err) res.json("Some error occured");
//    else res.json(x);
//  });

//}
//});


app.post("/handwrittenlogs", (req, res) => {
  let obj = req.body;
  console.log(req.body);
  console.log(obj);
  handwrittenLog.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});


app.get("/gethicksvilledataold/", (req, res) => {
 const  arr = req.body.string.split(" ");
 console.log(arr);
 const regex = arr.join("|");
 console.log(regex);
 const data = [];
  hicksvilleData.find( 
		      {
			name : { "$regex": req.body.string, "$options": "i" }
                      }
		, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
	
  });
 console.log(data);

});

// *********** Added by deepanshu ********

// added by Deepanshu
app.get("/getitemhandwritten/", (req,res) => {
  console.log(req.body);
  let invoices = mongoose.model(req.body.databaseName, handwittenInvoiceSchema );
  console.log(invoices);
 invoices.find({}, { _id:0, __v:0}, (err, x) => {
    if(err) res.json("Some error Occured");
    else res.json(x);


		})

})


// added by Deepanshu
app.put("/handwritteninvoice/:name/:Item", (req, res) => {
  let invoice = mongoose.model(req.params.name, handwittenInvoiceSchema);
  console.log(invoice);
  console.log(req.params.Item);
  invoice.findOne({ itemNo: req.params.Item }, (err, x) => {
	console.log("IN FINDONE");
	console.log(err);
	console.log(x);
    if (err) res.json("Some error occured")
    else if (x === null){
	let obj = req.body;
         obj["itemNo"] = req.params.Item; 
	console.log("OBJECT");
	console.log(obj);
          invoice.insertMany( obj, (err, x) => {
            if(err) res.json("Some error occured.");
            else res.json("Product created Successfully.");
		 });
}
    else {
	console.re.log("remote log test 3");
      let obj = req.body;
      obj["itemNo"] = req.params.Item;
      invoice.updateOne({ itemNo: req.params.Item }, obj, (err, x) => {
        if (err) res.json("Some error occured.");
        else res.json("Product updated xxxxx");
      });
    }
  });
});

app.post("/handwrittenposlogs", (req, res) => {
  let obj = req.body;
  console.log(req.body);
  console.log(obj);
  handwrittenPosLog.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});


// *********** Added by deepanshu ********
app.post("/scaninvoicedat", (req, res) => {
  let obj = req.body;
let invoiceNo = req.body.SavedInvoiceNo;
console.log(invoiceNo);
  scanInvoiceData.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});

app.post("/generatelog", (req, res) => {
  let obj = req.body;
  console.log(obj);
  logItemData.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});

app.post("/generateposlog", (req, res) => {
  let obj = req.body;
  console.log(obj);
  posLogModel.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});



app.post("/scaninvoicedata", (req, res) => {
  let name = req.body.InvoiceName;
  let invoiceNo = req.body.SavedInvoiceNo;
  let date = req.body.SavedDate;
  let obj = req.body;
  scanInvoiceData.find({InvoiceName: name, SavedInvoiceNo: invoiceNo, SavedDate: date}, { _id: 0, __v: 0 }, (err, o) => {
    if (err) { res.json("Some error occured"); }
    else if (o.length < 1) {
      scanInvoiceData.insertMany([obj], (err, o) => {
        if (err) res.json("Some error occured");
        else res.json("Product created successfully");
      });
    }
    else {
	console.log(o);
      res.json("exist");
    }
  });
});

app.post("/updateinvoicedata", (req, res) => {
  let invoice = req.body.invoice;
  let invoiceNo = req.body.invoiceNo;
  let date = req.body.date;
  let itemNo = req.body.itemNo
  scanInvoiceData.updateOne({InvoiceName: invoice, SavedInvoiceNo: invoiceNo, SavedDate: date, "InvoiceData.itemNo": itemNo },
                            {$set: {"InvoiceData.$.isUpdated": "true"} },
                            { _id: 0, __v: 0 },
                            (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  });

app.post("/updatedbafterposupdate", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    let itemN = req.body.itemName.toString();
    console.log("item name is:", itemN)
    invoice.updateOne({Item: req.body.item},
                      {SellingPrice: req.body.price, SellerCost: req.body.cost, POS:itemN},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  });

app.post("/reverseupdate", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {isReviewed: "false"},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  });

//added by parikshit.
app.post("/reverseposupdate", (req, res) => {
  let invoice = req.body.invoice;
  let invoiceNo = req.body.invoiceNo;
  let date = req.body.date;
  let itemNo = req.body.itemNo
  scanInvoiceData.updateOne({InvoiceName: invoice, SavedInvoiceNo: invoiceNo, SavedDate: date, "InvoiceData.itemNo": itemNo },
                            {$set: {"InvoiceData.$.isUpdated": "false"} },
                            { _id: 0, __v: 0 },
                            (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  });

app.post("/linkingcorrect", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {LinkingCorrect: "false"},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  });

 // added by parikshit.
  app.post("/linkmanually", (req, res) => {
    console.log("Helllllooooooooooooooooooo from link Mannually",req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {isReviewed: "true", LinkingCorrect: "true"},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  })


app.post("/savedetails", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {Details: req.body.details},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json("s");})
  
  });;



app.get("/pos", (req, res) => {
  pos.find({}, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
  });
});
app.get("/pos/:upc", (req, res) => {
  pos.findOne({ UPC: req.params.upc }, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else if (x === null) res.json("No product with given upc");
    else res.json(x);
  });
});

// ///////// for updating db data with POS updated values(vikul)///////

app.put("/poss/:upc/inv", (req, res) => {
  console.log("I am hit here")
  pos.findOne({ UPC: req.params.upc }, (err, x) => {
    if (err) res.json("Some error occured");
    else if (x === null) res.json("No such product exist");
    else {
      let count = parseFloat(req.body.count);
      
      let z = count + parseFloat(x.invoiceQty);
      console.log("I am count pos z", pos)
      pos.updateOne(
        { UPC: req.params.upc },
        { invoiceQty: z.toString()
          
        },
        (err, y) => {
          if (err) res.json("Some error occured");
          else res.json("Product updated successfully");
        }
      );
    }
  });
});

//////////////////////////////////////////////////////////////////


app.put("/pos/:upc/inv", (req, res) => {
  pos.findOne({ UPC: req.params.upc }, (err, x) => {
    if (err) res.json("Some error occured");
    else if (x === null) res.json("No such product exist");
    else {
      let count = parseFloat(req.body.count);
      let z = count + parseFloat(x.invoiceQty);
      pos.updateOne(
        { UPC: req.params.upc },
        { invoiceQty: z.toString() },
        (err, y) => {
          if (err) res.json("Some error occured");
          else res.json("Product   updated successfully");
        }
      );
    }
  });
});
app.post("/pos", (req, res) => {
  let obj = req.body;
  pos.findOne({ UPC: obj.UPC }, (err, x) => {
    if (err) res.json("Some error occured");
    else if (x === null) {
      pos.insertMany([obj], (err, o) => {
        if (err) res.json("Some error occured");
        else res.json("Product created successfully");
      });
    } else res.json("This UPC already exist");
  });
});
function sync(arr, newArr) {
  arr.sort((a, b) => a.UPC.localeCompare(b.UPC));
  newArr.sort((a, b) => a.UPC.localeCompare(b.UPC));
  let data = [];
  for (let i = 0; i < arr.length; i++) {
    let a = newArr[i];
    let b = arr[i];
    let obj = { ...a };
    obj["soldQty"] =
      parseFloat(b.TotalQty) +
      parseFloat(b.invoiceQty) -
      parseFloat(a.TotalQty);
    obj["TotalQty"] = a.TotalQty;
    obj["invoiceQty"] = 0;
    obj["wordpressSoldQty"] = 0;
    data.push(obj);
  }
  return data;
}
app.get("/pos/api/sync", (req, res) => {
  let options = {
    method: "GET",
    url: "https://dataservices.sypramsoftware.com/api/Item/GetItemList",
    headers: {
      Authorization: "Basic " + Buffer.from(authString).toString("base64"),
    },
    json: true,
  };
  function callback(error, response, body) {
    if (error) res.json("Some error occured");
    else {
      const newArr = body.Data;
      pos.find({}, { _id: 0, __v: 0 }, (err, arr) => {
        if (err) res.json("Some error occured");
        else {
          pos.deleteMany({}, (err, res1) => {
            if (err) res.json("Some error occured");
            else {
              let x = sync(arr, newArr);
              pos.insertMany(x, (err, res2) => {
                if (err) res.json("Some error occured");
                else res.json(x);
              });
            }
          });
        }
      });
    }
  }
  request(options, callback);
});
app.get("/pos/api/refresh", (req, res) => {
  let options = {
    method: "GET",
    url: "https://dataservices.sypramsoftware.com/api/Item/GetItemList",
    headers: {
      Authorization: "Basic " + Buffer.from(authString).toString("base64"),
    },
    json: true,
  };
  function callback(error, response, body) {
    const newArr = body.Data;
    pos.deleteMany({}, (err, res1) => {
      pos.insertMany(newArr, (err, res2) => {
        res.json("Refreshed");
      });
    });
  }
  request(options, callback);
});
app.listen(3001, () => {
  console.log(`Server Running`);
});
