const express = require('express')
const multer = require("multer");
const http  = require('http')
const textractHelper = require("aws-textract-helper");
const request = require("request");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const WebSocketServer = require("ws").Server;
const { readImage } = require("./controller/tesseract-ocr");
const jsonData = require("./model/chetak-products.json");
require("dotenv").config({ path: __dirname + "/.env" });

// const homeRoutes = require('./routes/home')

const app = express()
//initialize a simple http server
const server = http.createServer(app);
// console.log("server", server)
//initialize the WebSocket server instance
const wss = new WebSocketServer({ server });
const clients = []

// const upload = multer({ dest: "uploads/" });
wss.on("connection", (ws) => {
    clients.push(ws)
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  // ws.send(JSON.stringify("Hi there, I am a WebSocket server"));
});


// for parsing application/json
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.single('file'));


// 
app.post("/api/upload-image", (req, res) => {
  
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
      console.log('body from req', body.body)
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

app.get("/api/product", (req, res) => {
  res.send({ item: jsonData[req.query["item"]] });
});

app.post("/api/login", (req, res) => {
  console.log("headers",req.headers)
  res.send('success')
});

app.post("/api/ocr", function (req, res) {
  const filename = req.body.data["filename"]
  console.log('Calling ocr', filename)
  res.send("ocr ")
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
    console.log('Data texttract', dataFromTextract)
    const tables = textractHelper.createTables(dataFromTextract);
    console.log()
    let obj = { statusCode: 200, body: tables };
    console.log('OBJ', obj)
    res.json(obj);
  }
  // request(options, callback);
});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});