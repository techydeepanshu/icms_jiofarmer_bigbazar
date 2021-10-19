const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const authString = true
  ? "MeCHHkZ9:tdypsA =:lqBZghxJgaVE"
  : "lRRqlkYefuV=:lRRqlkYefuV6jJ==:qzOUsBmZFgMDlwGtrgYypxUz";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
mongoose
  .connect("mongodb://verveuser:vervebot123@3.91.159.202/vervedb")
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
  isReviewed: { type: String, default: "false" },
  SellingPrice: String,
  Department: String,
  SellerCost: String,
  Size: String,
  isUpdated: { type: String, default: "false" },
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
});
let notFound = mongoose.model("notfounds", notFoundSchema);

const scanInvoiceDataSchema  = new Schema({
  InvoiceName: String,
  InvoiceData: { type: Array, default: []},
  SavedDate: String,
  SavedInvoiceNo: String 
})
let scanInvoiceData = mongoose.model("scaninvoicedatas", scanInvoiceDataSchema);

const logItemSchema = new Schema({
  Description: String,
  PosName: String,
  SKU: String,
  Barcode: String,
  InvoiceName: String,
  ItemCode: String,
  LinkingDate: String,
  PersonName: String,
  Size: String,
  UnitCost: String,
  UnitPrice: String,
  InvoiceUnitCost: String,
  InvoiceNo: String,
  InvoiceDate: String,
  Department: String,
  CostIncrease: String,
  CostDecrease: String,
  CostSame: String

});
let logItemData = mongoose.model("linkinglogs", logItemSchema);

const hicksvilleSchema = new Schema({
  
});
let hicksvilleData = mongoose.model("Hicksvilles", hicksvilleSchema);

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
app.put("/invoice/:name/:Item", (req, res) => {
  console.log(req.body);
  let invoice = mongoose.model(req.params.name, invoiceSchema);
  invoice.findOne({ Item: req.params.Item }, (err, x) => {
    if (err) {
      let obj = req.body;
      obj["Item"] = req.params.Item;
      obj["Description"] = req.params.name;
      invoice.insertOne(obj, (err, x) => {
        if(err) res.json("Some error occured.");
        else res.json("Product created Successfully.");
      });
    }
    else if (x === null) {
      let obj = req.body;
         obj["Item"] = req.params.Item;
         obj["Description"] = req.params.Item;  
        console.re.log(obj);
          invoice.insertMany( obj, (err, x) => {
            if(err) res.json("Some error occured.");
            else res.json("Product created Successfully.");
          });

    }
    else {
      let obj = req.body;
      obj["Item"] = req.params.Item;
      invoice.updateOne({ Item: req.params.Item }, obj, (err, x) => {
        if (err) res.json("Some error occured");
        else res.json("Product updated successfully");
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

//added by Parikshit.
app.get("/getsaveinvoicedata/:invoice", (req, res) => {
  scanInvoiceData.find({InvoiceName: req.body.invoice, SavedInvoiceNo: req.body.invoiceNo, SavedDate: req.body.date}, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
  });
});

//added by Parikshit.
app.get("/getsavedinvoices/", (req, res) => {
  console.log(req.body);
  scanInvoiceData.find({InvoiceName: req.body.invoice}, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
  });
});

app.get("/gethicksvilledata/", (req, res) => {
  
  hicksvilleData.find({name : { "$regex": req.body.string, "$options": "i" }
                      }, { _id: 0, __v: 0 }, (err, x) => {
    if (err) res.json("Some error occured");
    else res.json(x);
  });
});

app.post("/scaninvoicedat", (req, res) => {
  let obj = req.body;
  console.log(obj);
console.log(invoiceNo);
  logItemData.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});

app.post("/generatelog", (req, res) => {
  let obj = req.body;
  logItemData.insertMany([obj], (err, o) => {
    if (err) res.json("Some error occured");
    else res.json("Product created successfully");
  });
});

//added by parikshit.
app.post("/scaninvoicedata", (req, res) => {
  let name = req.body.InvoiceName;
  let invoiceNo = req.body.SavedInvoiceNo;
  let date = req.body.SavedDate;
  let obj = req.body;
  scanInvoiceData.find({InvoiceName: name, SavedInvoiceNo: invoiceNo, SavedDate: date}, (err, o) => {
    if (err) {res.json("Some error occured");}
    else if (o === null) {
      scanInvoiceData.insertMany([obj], (err, o) => {
        if (err) res.json("Some error occured");
        else res.json("Product created successfully");
      });
    }
    else {
      res.json("Invoice with same no. and date already exists, change either of the 2 values")
    }
  });
  
});

//added by parikshit.
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

  //added by parikshit.
  app.post("/updatedbafterposupdate", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.data.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.item},
                      {SellingPrice: req.body.price, SellerCost: req.body.cost},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  });
  // added by parikshit.
  app.post("/reverseupdate", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {isReviewed: "false"},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  });

  // added by parikshit.
  app.post("/savedetails", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {Details: req.body.details},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json("success");})
  
  });


  app.post("/linkingcorrect", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {LinkingCorrect: "true"},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  });

  // added by parikshit.
  app.post("/linkmanually", (req, res) => {
    console.log(req.body);
    let invoice = mongoose.model(req.body.invoice, invoiceSchema);
    invoice.updateOne({Item: req.body.itemNo},
                      {isReviewed: "true", LinkingCorrect: "true"},
                      { _id: 0, __v: 0 },
    (err, x) => { if (err) res.json("Some error occured"); else res.json(x);})
  
  });


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
          else res.json("Product updated successfully");
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
