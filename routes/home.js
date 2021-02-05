const express = require("express");
const { readImage } = require("../controller/tesseract-ocr");
const router = express.Router();
const jsonData = require("../model/chetak-products.json");


router.post('/api/read-value', async (req, res) =>{
    req.setTimeout(0) // no timeout
    res.setTimeout(0)
    // console.log("Request obj", req.file.path)
    const data = await readImage(`./${req.file.path}`);
    res.send(data);
    // res.redirect("/")
})

router.get("/api/product", (req, res) => {
  res.send({ item: jsonData[req.query["item"]] });
});

module.exports = router;
