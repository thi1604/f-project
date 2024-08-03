const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller.js");


router.get("/register", controller.register);

module.exports = router;