const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.user_create_post = [
  body("first_name", "First name must be longer than 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("last_name", "Last name must be longer than 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("username", "Username must be longer than 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("password", "Password must be longer than 6 characters")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword,
      member: true,
    });

    try {
      await user.save();
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }),
];

exports.user_login_post = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", "Invalid username or password.");
      return res.redirect("/");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "You have successfully logged in.");
      return res.redirect("/");
    });
  })(req, res, next);
};
