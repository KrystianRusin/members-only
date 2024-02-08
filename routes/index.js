const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only", messages: req.flash() });
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Sign Up" });
});

router.get("/log-in", function (req, res, next) {
  res.render("log-in", { title: "Log In" });
});

module.exports = router;
