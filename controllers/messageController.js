const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

exports.createMessage = [
  asyncHandler(async (req, res, next) => {
    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      timestamp: new Date(),
      user: req.user._id,
    });

    try {
      await message.save();
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }),
];

exports.getMessage = [
  asyncHandler(async (req, res, next) => {
    try {
      const messages = await Message.find({}).populate("user");
      res.render("index", {
        title: "Members Only",
        user: req.user,
        messages: messages,
      });
    } catch (err) {
      console.log(err);
      // If the messages collection doesn't exist, render the page without any messages
      res.render("index", {
        title: "Members Only",
        user: req.user,
        messages: [],
      });
    }
  }),
];

exports.deleteMessage = [
  asyncHandler(async (req, res, next) => {
    try {
      Message.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }),
];
