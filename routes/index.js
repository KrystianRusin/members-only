const express = require("express");
const messageController = require("../controllers/messageController");
const Message = require("../models/message");
const router = express.Router();

router.get("/", messageController.getMessage);

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Sign Up", user: req.user });
});

router.get("/log-in", function (req, res, next) {
  res.render("log-in", { title: "Log In", user: req.user });
});

router.post("/create-message", messageController.createMessage);

router.get("/delete-message/:id", messageController.deleteMessage);

module.exports = router;
