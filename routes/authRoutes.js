const express = require("express");
const router = express.Router();

router.get("/auth/login", (req, res) => {
  console.log("Request obj", req.body);
  res.send("SomeRandomString");
});

module.exports = router;
