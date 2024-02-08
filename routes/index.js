const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only" });
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Sign Up" });
});

module.exports = router;
