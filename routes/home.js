const express = require("express");
const router = express.Router();


router.get('/read-value', (req, res) =>{
    // console.log("Request obj", req.body)
    res.send("SomeRandomString")
    res.redirect("/")
})

module.exports = router;
