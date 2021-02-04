const express = require('express')
const multer = require("multer");

const homeRoutes = require('./routes/home')

const app = express()

const upload = multer({ dest: "uploads/" });

// for parsing application/json
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.single('file'));

app.use('/',homeRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT)
})