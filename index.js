const express = require("express");
const multer = require("multer");
const textractHelper = require("aws-textract-helper");
const request = require("request");
const spawn = require("child_process").spawnSync;
require("dotenv").config({ path: __dirname + "/.env" });
const dirName = __dirname;
const createLinkingLogsXlsx = require("./createLinkingLogsXlsx");
const createPosLogsXlsx = require("./createPosLogsXlsx");
const syncProductsWithPos = require("./sync_products/syncProductsWithPos");
const app = express();
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


const isPOSProduction = true;
const { sign } = require("./authenticate");
const { validateLogin } = require("./middlewares/requireLogin");
const { getDBInvoiceName } = require("./mapInvoiceName");

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.single("file"));


app.post("/api/upload-image", validateLogin, (req, res) => {
  let uid = req.headers["user-key"];
  let ext = "jpg";
  let base64 = req.file.buffer.toString("base64");
  let imageId = uid + Date.now().toString();
  let options = {
    method: "POST",
    url: process.env.url + "/upload",
    headers: { "x-api-key": process.env.API_SECRET },
    body: { img: base64, fileExt: ext, imageID: imageId },
    json: true,
  };

  function callback(error, response, body) {
    if (error === null) {
      // console.log('body from req', body.body)
      const result = { message: body.body, filename: imageId + "." + ext };
      res.send(result);
    } else {
      res.status(400).send({
        message: "Couldn't upload image",
      });
      console.log("error upload", error);
    }
  }
  request(options, callback);
});

app.get("/api/product", validateLogin, (req, res) => {
  const invoice = getDBInvoiceName(req.query["invoiceName"]);
  console.log("invoice : ",invoice);
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/invoice/${invoice}`,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.get("/api/invoice/gethicksvilledata", validateLogin, (req, res) => {
  const saveDate = "05/10/2021";
  const fetchDate = "05/10/2021";
  const input = req.query.input;
  // console.log("IN INDEX");
  // console.log(req.query);

  // const invoiceNo = req.query["invoiceNo"];
  // const date = req.query["date"];
  // console.log("1" + date + "1");
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/gethicksvilledata/`,
    body: {string: input },
    json: true,
  };
  function callback(error, response, body) {
    // console.log(response);
    // console.log(body);
    // const result = body[0].List.filter(item => item.name.search(req.query.input) != -1)
    const status = response.statusCode;
    // console.log(error, body);
    // console.log(result);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.get("/api/invoice/getsaveinvoicedata", validateLogin, (req, res) => {
  const invoice = req.query["invoiceName"];
  const invoiceNo = req.query["invoiceNo"];
  const date = req.query["date"];
  // console.log("1" + date + "1");
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/getsaveinvoicedata/`,
    body: {invoice: invoice, invoiceNo: invoiceNo, date: date },
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.get("/api/invoice/getitemhandwritten", validateLogin, (req, res) => {
  // console.log(req);
  const data = req.query;
  console.log(data);
  let invoice = getDBInvoiceName(data.slug);
  console.log(invoice);
  // console.log("1" + date + "1");
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/getitemhandwritten/`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.get("/api/invoice/fetchproductfromposlist", validateLogin, (req, res) => {
  const data = req.query;
  
  console.log(req.query);
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/fetchproductfromposlist/`,
    body: {data: data},
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  // request(options, callback);
});

//added by Parikshit.
app.get("/api/invoice/getsavedinvoices", validateLogin, (req, res) => {
  const invoice = req.query;
  console.log("invoice : ",invoice);
  console.log(invoice);
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/getsavedinvoices/`,
    body: {invoice: invoice},
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    // console.log("body : ",body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/updateinvoicedata", validateLogin, (req, res) => {
  console.log(req.body.params.invoiceName);
  const invoice = req.body.params.invoiceName;
  const invoiceNo = req.body.params.invoiceNo;
  const date = req.body.params.date;
  const itemNo = req.body.params.itemNo;
  console.log(invoice);
  console.log(invoiceNo);
  console.log(itemNo);
  console.log(date);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/updateinvoicedata/`,
    body: {invoice: invoice, invoiceNo: invoiceNo, date: date, itemNo: itemNo },
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/reverseposupdate", validateLogin, (req, res) => {
  console.log(req.body.params.invoiceName);
  const invoice = req.body.params.invoiceName;
  const invoiceNo = req.body.params.invoiceNo;
  const date = req.body.params.date;
  const itemNo = req.body.params.itemNo;
  console.log(invoice);
  console.log(invoiceNo);
  console.log(itemNo);
  console.log(date);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/reverseposupdate/`,
    body: { invoice: invoice, invoiceNo: invoiceNo, date: date, itemNo: itemNo },
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/reverseupdate", validateLogin, (req, res) => {
  console.log(req.body);
  let data = req.body;
  data.invoice = getDBInvoiceName(data.invoice);
  console.log(data);


  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/reverseupdate/`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/savedetails", validateLogin, (req, res) => {
  console.log(req.body);
  let data = req.body;
  data.invoice = getDBInvoiceName(data.invoice);
  console.log(data);


  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/savedetails/`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/linkingcorrect", validateLogin, (req, res) => {
  console.log(req.body);
  let data = req.body;
  data.invoice = getDBInvoiceName(data.invoice);
  console.log(data);


  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/linkingcorrect/`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/linkmanually", validateLogin, (req, res) => {
  console.log(req.body);
  let data = req.body;
  data.invoice = getDBInvoiceName(data.invoice);
  console.log(data);


  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/linkmanually/`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.get("/api/invoice/getlinkinglogsxlsx", validateLogin, createLinkingLogsXlsx)
app.get("/api/invoice/getposLogsxlsx", validateLogin, createPosLogsXlsx)
app.get("/api/syncproductwithpos", validateLogin, syncProductsWithPos)

app.post("/api/invoice/updatedbafterposupdate", validateLogin, (req, res) => {
  // console.log(req.body);
  const data = {
    cost: req.body.cost,
    price: req.body.price,
    item: req.body.item,
    itemName:req.body.itemName,
    invoice: getDBInvoiceName(req.body.invoice)
  };
  console.log(data);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/updatedbafterposupdate`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

// added by deepanshu
app.post("/api/invoice/updateinventoryindb", validateLogin, (req, res) => {
  console.log(req.body.params.invoiceName);
  const invoice = req.body.params.invoiceName;
  const invoiceNo = req.body.params.invoiceNo;
  const date = req.body.params.date;
  const itemNo = req.body.params.itemNo;
  console.log(invoice);
  console.log(invoiceNo);
  console.log(itemNo);
  console.log(date);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/updateinventoryindb/`,
    body: {invoice: invoice, invoiceNo: invoiceNo, date: date, itemNo: itemNo },
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});



app.get("/api/fuzzwuzz", validateLogin, (req, res) => {
  const type = req.query["type"];
  const dirname = type === "queue" ? "/csv/Export.csv" : "/csv/Hicksville.csv";
  const newProcess = spawn("python", [
    "./script.py",
    req.query["name"],
    10000,
    dirName + dirname,
  ]);

  let result = newProcess.stdout.toString().trim();  
  result = result.split("$$$");
  
  let data = [];
  for (let i = 0; i < result.length; i++) {
    let s = result[i].split("@@@");
    let obj =
      type === "pos"
        ? {
            sku: s[0] === "nan" ? null : s[0],
            upc: s[1] === "nan" ? null : s[1],
            altupc1: s[2] === "nan" ? null : s[2],
            altupc2: s[3] === "nan" ? null : s[3],
            name: s[4] === "nan" ? null : s[4],
            vintage: s[5] === "nan" ? null : s[5],
            totalQty: s[6] === "nan" ? null : s[6],
            cost: s[7] === "nan" ? null : s[7],
            pricea: s[8] === "nan" ? null : s[8],
            priceb: s[9] === "nan" ? null : s[9],
            pricec: s[10] === "nan" ? null : s[10],
            department: s[11] === "nan" ? null : s[11],
            salePrice: s[12] === "nan" ? null : s[12],
            size: s[13] === "nan" ? null : s[13],
            pack: s[14] === "nan" ? null : s[14],
            price: s[15] === "nan" ? null : s[15],
          }
        : { name: s[3] === "nan" ? null : s[3] };
    data.push(obj);
  }
  res.json({ result: data });
});

app.post("/api/login", (req, res) => {
  try {
    const { userId, email } = req.body.data;
    const signedToken = sign({ userId, email });
    // console.log("gen token",signedToken)
    res.send({ token: signedToken });
  } catch (error) {
    res.status(400).send({
      error: "Couldn't generate token",
    });
  }
});

app.post("/api/ocr", validateLogin, function (req, res) {
  const filename = req.body.data["filename"];
  //console.log('Calling ocr', filename)
  // res.send("ocr ")
  let options = {
    method: "POST",
    url: process.env.url + "/ocr",
    headers: { "x-api-key": process.env.API_SECRET },
    body: filename,
    json: true,
  };
  function callback(error, response, body) {
    if (error !== null) res.json({ statusCode: 404 });
    let dataFromTextract = body.body;
    // console.log('Data texttract', dataFromTextract)
    const tables = textractHelper.createTables(dataFromTextract);
    // console.log()
    let obj = { statusCode: 200, body: tables };
    // console.log('OBJ', obj)
    // console.table("table", tables[0], tables[1])
    res.json(obj);
  }
  request(options, callback);
});

// app.get("/api/getPOSProduct", validateLogin, function (req, res) {
//   const upc = req.query["upc"];
//   const itemName = req.query["itemName"];

//   let options = {
//     method: "GET",
//     url: "https://dataservices.sypramsoftware.com/api/Product/GetItem`,
//     headers: isPOSProduction
//       ? {
//           UserId: "lRRqlkYefuV=",
//           Password: "lRRqlkYefuV6jJ==",
//           Pin: "qzOUsBmZFgMDlwGtrgYypxUz",
//         }
//       : {
//           UserId: "MeCHHkZ9",
//           Password: "tdypsA =",
//           Pin: "lqBZghxJgaVE",
//         },
//     body: {
//       UPC: upc,
//       ITEMNAME: itemName,
//     },
//     json: true,
//   };
//   function callback(error, response, body) {
//     // console.log(body);
//     res.send(body);
//   }
//   request(options, callback);
// });


app.get("/api/GetPOSInventory", validateLogin, function (req, res) {
  const Barcode = req.query["Barcode"];
console.log("getinventory : ",Barcode)
  let options = {
    method: "GET",
    url: `${process.env.POS_API}/getinventory`,
    body: {
      Barcode: Barcode
    },
    json: true,
  };
  function callback(error, response, body) {
    // console.log(body);
    res.send(body);
  }
  request(options, callback);
});

app.get("/api/getPOSProduct", validateLogin, function (req, res) {
  const upc = req.query["upc"];
  const itemName = req.query["itemName"];

  let options = {
    method: "GET",
    url: `${process.env.POS_API}/getsingledata`,
    // headers: isPOSProduction
    //   ? {
    //       UserId: "lRRqlkYefuV=",
    //       Password: "lRRqlkYefuV6jJ==",
    //       Pin: "qzOUsBmZFgMDlwGtrgYypxUz",
    //     }
    //   : {
    //       UserId: "MeCHHkZ9",
    //       Password: "tdypsA =",
    //       Pin: "lqBZghxJgaVE",
    //     },
    body: {
      UPC: upc,
      ITEMNAME: itemName,
    },
    json: true,
  };
  function callback(error, response, body) {
    // console.log(body);
    res.send(body);
  }
  request(options, callback);
});

app.get("/api/sync", validateLogin, function (req, res) {
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/pos/api/sync`,
    json: true,
  };
  //console.log("INDEXJS");
  /* let options = {
    method: "GET",
    url:  "https://dataservices.sypramsoftware.com/api/Product/GetSoldItemList`,
    json: true,
    headers:{
      UserId: "lRRqlkYefuV=",
      Password: "lRRqlkYefuV6jJ==",
      Pin: "qzOUsBmZFgMDlwGtrgYypxUz"
    },
    body:{
      STARTDATE: "20-July-2021",
      ENDDATE: "22-July-2021"
    },
  }; */
  function callback(error, response, body) {
    // console.log(body);
    console.log(response);
    console.log("BODY",body);
    res.send(body);
  }
  request(options, callback);
});

/**create/update product on POS */
// app.post("/api/pos/Product/ManageItem", validateLogin, function (req, res) {
//   const data = req.body;
//   console.log(data);

//   let options = {
//     method: "POST",
//     url: "https://dataservices.sypramsoftware.com/api/Product/ManageItem`,
//     headers: isPOSProduction
//       ? {
//           UserId: "lRRqlkYefuV=",
//           Password: "lRRqlkYefuV6jJ==",
//           Pin: "qzOUsBmZFgMDlwGtrgYypxUz",
//         }
//       : {
//           UserId: "MeCHHkZ9",
//           Password: "tdypsA =",
//           Pin: "lqBZghxJgaVE",
//         },
//     body: data,
//     json: true,
//   };
//   function callback(error, response, body) {
//     const status = response.statusCode;
//     // console.log(error, body);
//     if (error === null) {
//       res.status(status).send(body);
//     } else {
//       res.status(status).send(error);
//     }
//   }
//   request(options, callback);
// });

app.post("/api/pos/Product/ManageItem", validateLogin, function (req, res) {
  const data = req.body;
  console.log(data);

  let options = {
    method: "POST",
    url: `${process.env.POS_API}/update`,
    // headers: isPOSProduction
    //   ? {
    //       UserId: "lRRqlkYefuV=",
    //       Password: "lRRqlkYefuV6jJ==",
    //       Pin: "qzOUsBmZFgMDlwGtrgYypxUz",
    //     }
    //   : {
    //       UserId: "MeCHHkZ9",
    //       Password: "tdypsA =",
    //       Pin: "lqBZghxJgaVE",
    //     },
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});


app.post("/api/updateinventory", validateLogin, function (req, res) {
  const data = req.body;
  console.log("updateinventoiry : ",data);

  let options = {
    method: "POST",
    url: `${process.env.POS_API}/updateinventory`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.put("/api/invoice/product/update", validateLogin, function (req, res) {
  
  const data = req.body;
  console.log(data);
  const { invoiceName, value } = data;
  console.log("Item name",value.Item);
  console.log(data,"Mongo PUT Request Data"); 
  console.log("invoice dbname : ",getDBInvoiceName(invoiceName));
  let options = {
    method: "PUT",
    url: `http://${process.env.MONGO_IP}:3001/invoiceitem/${getDBInvoiceName(
      invoiceName
    )}`,
    body: value,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

// added by Deeapanshu
app.put("/api/handwritteninvoice/product/update", validateLogin, function (req, res) {
  
  const data = req.body;
  console.log(data);
  const { invoiceName, itemName, value } = data;
  console.log("Item name",itemName);
  console.log(data,"Mongo PUT Request Data"); 
  console.log("invoice dbname : ",getDBInvoiceName(invoiceName));
  let options = {
    method: "PUT",
    url: `http://${process.env.MONGO_IP}:3001/handwritteninvoice/${getDBInvoiceName(
      invoiceName
    )}/${itemName}`,
    body: value,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

// added by Deepanshu
app.get("/api/invoice/gethandwrittenposlogs", validateLogin , function (req,res){
  console.log("data : ",req.query);
  const data = req.query;
  // let {invoicename,itemNo,sku,updatedate} = req.query;
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/gethandwrittenposlog`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
})



app.post("/api/invoice/notfound", validateLogin, function (req, res) {
  const data = req.body;
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/notfound`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/scaninvoicedata", validateLogin, function (req, res) {
  const data = req.body;
  console.log(data);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/scaninvoicedata`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/generatelog", validateLogin, function (req, res) {
  let data = req.body;
  data.InvoiceName = data.invoiceName;
  data.ItemCode = data.itemName;
  console.log("UPDATE LOG",data);
  let invoiceCost = data.InvoiceUnitCost;
  console.log("Invoice Cost", invoiceCost)

  let logData = {
    InvoiceDescription: data.Description,
    PosDescription: data.value.POS,
    SKU: data.value.PosSKU,
    Barcode: data.value.Barcode,
    InvoiceName: data.invoiceName,
    ItemCode: data.itemName,
    LinkingDate: data.LinkingDate,
    PersonName: data.PersonName,
    Size: data.value.Size,
    PosUnitCost: data.value.SellerCost,
    PosUnitPrice: data.value.SellingPrice,
    InvoiceNo: data.InvoiceNo,
    InvoiceDate: data.InvoiceDate,
    Department: data.value.Department,
    CostIncrease: data.CostIncrease,
    CostDecrease: data.CostDecrease,
    CostSame: data.CostSame,
    InvUnitCost: data.InvoiceUnitCost,
    InvError: data.invError
    // InvoiceUnitcost: data.InvoiceUnitCost
  };


  console.log(logData);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/generatelog`,
    body: logData,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/linkmanuallylog", validateLogin, function (req, res) {
  const data = req.body;
  console.log(data);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/generatelog`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/poslogs", validateLogin, function (req, res) {
  const data = req.body;
  console.log(data);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/generateposlog`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

// added by Deepanshu
app.post("/api/invoice/posinventorylog", validateLogin, function (req, res) {
  const data = req.body;
  console.log(data);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/generateposinventorylog`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.get("/api/invoice/getposinventorylog", validateLogin, function (req, res) {
  const data = req.query;
  console.log(req.query)
  console.log(req.body.params)
  console.log(req.query)
  console.log(data);
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/getposinventorylog`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

//added by Parikshit.
app.post("/api/invoice/handwrittenposlogs", validateLogin, function (req, res) {
  const data = req.body;
  console.log(data);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/handwrittenposlogs`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});
app.get("/api/invoice/gethandwrittenlogs", validateLogin, function (req, res) {
  const data = req.query;
  console.log("data : ",data);
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/gethandwrittenlogs`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.post("/api/invoice/unidentifiedlog", validateLogin, function (req, res) {
  const data = req.body;
  console.log(data);
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/generatelog`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});



app.get("/api/invoice/pos", validateLogin, function (req, res) {
  // console.log(req.body);
  const dates = req.body;
  const startDate = dates.startDate;
  const endDate = dates.endDate
  // console.log(dates);
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/pos`,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.post("/api/invoice/pos/create", validateLogin, function (req, res) {
  const data = req.body;
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/pos`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.put("/api/invoice/pos/update", validateLogin, function (req, res) {
  const data = req.body;
  // console.log("body data", data);
  let options = {
    method: "PUT",
    url: `http://${process.env.MONGO_IP}:3001/pos/${data.UPC}/inv`,
    body: { count: data.count },
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.post("/api/allproducts",validateLogin,function(req,res){

  console.log("body data : ",req.body)
  let data = req.body
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/allproducts`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
})
app.get("/api/getproductbybarcode",validateLogin,function(req,res){

  console.log("body data : ",req.query["0"])
  const barcode = req.query["0"];
  let options = {
    method: "GET",
    url: `http://${process.env.MONGO_IP}:3001/getallproducts/${barcode}`,
    // body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
})

app.post("/api/generateunitincaselog",validateLogin,function(req,res){

  console.log("body data : ",req.body)
  let data = req.body
  let options = {
    method: "POST",
    url: `http://${process.env.MONGO_IP}:3001/unitincaselog`,
    body: data,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
})

if (process.env.NODE_ENV === "production") {
  //It will serve the files from main.js
  app.use(express.static("client/build"));

  //Serves the index.html file if doesn't recognoizes the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});
