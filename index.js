const express = require("express");
const multer = require("multer");
const textractHelper = require("aws-textract-helper");
const request = require("request");
const spawn = require("child_process").spawnSync;
require("dotenv").config({ path: __dirname + "/.env" });
const dirName = __dirname;

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
  let options = {
    method: "GET",
    url: `http://3.91.159.202:3001/invoice/${invoice}`,
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

app.get("/api/getPOSProduct", validateLogin, function (req, res) {
  const upc = req.query["upc"];
  const itemName = req.query["iteName"];

  let options = {
    method: "GET",
    url: "https://dataservices.sypramsoftware.com/api/Product/GetItem",
    headers: isPOSProduction
      ? {
          UserId: "lRRqlkYefuV=",
          Password: "lRRqlkYefuV6jJ==",
          Pin: "qzOUsBmZFgMDlwGtrgYypxUz",
        }
      : {
          UserId: "MeCHHkZ9",
          Password: "tdypsA =",
          Pin: "lqBZghxJgaVE",
        },
    body: {
      UPC: upc,
      ITEMNAME: itemName,
    },
    json: true,
  };
  function callback(error, response, body) {
    console.log(body);
    res.send(body);
  }
  request(options, callback);
});

app.get("/api/sync", validateLogin, function (req, res) {
  let options = {
    method: "GET",
    url: "http://3.91.159.202:3001/pos/api/sync",
    json: true,
  };
  function callback(error, response, body) {
    // console.log(body);
    res.send(body);
  }
  request(options, callback);
});

/**create/update product on POS */
app.post("/api/pos/Product/ManageItem", validateLogin, function (req, res) {
  const data = req.body;

  let options = {
    method: "POST",
    url: "https://dataservices.sypramsoftware.com/api/Product/ManageItem",
    headers: isPOSProduction
      ? {
          UserId: "lRRqlkYefuV=",
          Password: "lRRqlkYefuV6jJ==",
          Pin: "qzOUsBmZFgMDlwGtrgYypxUz",
        }
      : {
          UserId: "MeCHHkZ9",
          Password: "tdypsA =",
          Pin: "lqBZghxJgaVE",
        },
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
  const { invoiceName, itemName, value } = data;
  console.log(data,"Mongo PUT Request Data");
  let options = {
    method: "PUT",
    url: `http://3.91.159.202:3001/invoice/${getDBInvoiceName(
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

app.post("/api/invoice/notfound", validateLogin, function (req, res) {
  const data = req.body;
  let options = {
    method: "POST",
    url: "http://3.91.159.202:3001/notfound",
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
  let options = {
    method: "GET",
    url: "http://3.91.159.202:3001/pos",
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
    url: "http://3.91.159.202:3001/pos",
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
  console.log("body data", data);
  let options = {
    method: "PUT",
    url: `http://3.91.159.202:3001/pos/${data.UPC}/inv`,
    body: { count: data.count },
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
