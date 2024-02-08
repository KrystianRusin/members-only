const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.post("/sign-up", user_controller.user_create_post);

router.post("/log-in", user_controller.user_login_post);

module.exports = router;
