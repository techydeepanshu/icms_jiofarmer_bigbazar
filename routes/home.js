const express = require("express");
const { readImage } = require("../controller/tesseract-ocr");
const router = express.Router();


router.post('/api/read-value', async (req, res) =>{
    // const data = await readImage("test")
    console.log("Request obj", req.body)
    res.send("data");
    res.redirect("/")
})

module.exports = router;
