const express = require('express')
const multer = require("multer");
const http  = require('http')
const WebSocketServer = require("ws").Server;
const { readImage } = require("./controller/tesseract-ocr");

// const homeRoutes = require('./routes/home')

const app = express()
//initialize a simple http server
const server = http.createServer(app);
// console.log("server", server)
//initialize the WebSocket server instance
const wss = new WebSocketServer({ server });
const clients = []

const upload = multer({ dest: "uploads/" });
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


// app.use('/',homeRoutes)
app.post("/api/read-value", (req, res) => {
  req.setTimeout(0); // no timeout
  res.setTimeout(0);
  console.log("Request obj", req.file.path);
  res.send("Success");
  readImage(`./${req.file.path}`)
    .then(data => {
      try {
        clients[0].send(
        JSON.stringify(data)
      );
      } catch (error) {
        console.log("couldn't find any client", error)
      }
      
    })
  // res.redirect("/")
});


const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});