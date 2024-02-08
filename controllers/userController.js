const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
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
