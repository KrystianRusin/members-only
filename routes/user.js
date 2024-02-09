const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/sign-up", userController.user_create_post);

router.post("/log-in", userController.user_login_post);

module.exports = router;
