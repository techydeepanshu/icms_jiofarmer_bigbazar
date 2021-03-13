const express = require('express');
const multer = require("multer");
const textractHelper = require("aws-textract-helper");
const request = require("request");
require("dotenv").config({ path: __dirname + "/.env" });


const app = express()
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


const chetakData = require("./model/chetak-products.json");
const krishnaFoodsData = require("./model/krishna-foods-products.json")
const seamarkData = require("./model/seamark.json")
const advanceFoodsData = require("./model/advance-foods.json")
const joyGourmetFoodsData = require("./model/joy-gourmet-foods.json")
const bestFoodsData = require("./model/best-foods.json")
const katzmanData = require("./model/katzman.json");
const { sign } = require('./authenticate');
const { validateLogin } = require('./middlewares/requireLogin');


// for parsing application/json
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.single('file'));


app.post("/api/upload-image", validateLogin, (req, res) => {
  
  let uid = req.headers["user-key"];
  let ext = 'jpg'
  let base64 = req.file.buffer.toString("base64");
  let imageId = uid + Date.now().toString()
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
      const result = {message: body.body, filename: imageId + '.' + ext}
      res.send(result)
    }
    else {
      res.status(400).send({
        message: "Couldn't upload image",
      });
      console.log('error upload', error)
    };
  }
  request(options, callback);
});

app.get("/api/product", validateLogin,  (req, res) => {
  switch (req.query["invoiceName"]) {
    case "chetak":
      res.send({ invoiceData: chetakData });
      break;
    case "krishna-foods":
      res.send({ invoiceData: krishnaFoodsData });
    case "sea-mark":
      res.send({ invoiceData: seamarkData });
    case "advance-foods":
      res.send({ invoiceData: advanceFoodsData });
    case "joy-gourmet-foods":
      res.send({ invoiceData: joyGourmetFoodsData });
    case "best-foods":
      res.send({ invoiceData: bestFoodsData });
    case "katzman":
      res.send({ invoiceData: katzmanData });
    default:
      break;
  }
  // res.send({ item: jsonData[req.query["item"]] });
});

app.post("/api/login", (req, res) => {
  try {
    const {userId, email} = req.body.data
    const signedToken = sign({userId, email})
    // console.log("gen token",signedToken)
    res.send({token: signedToken})
  } catch (error) {
    res.status(400).send({
      error: "Couldn't generate token",
    });
  }
  
});

app.post("/api/ocr", validateLogin, function (req, res) {
  const filename = req.body.data["filename"]
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

if (process.env.NODE_ENV === "production") {
  //It will serve the files from main.js
  app.use(express.static("client/build"));

  //Serves the index.html file if doesn't recognoizes the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});