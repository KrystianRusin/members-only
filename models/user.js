const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  last_name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  username: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  member: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
