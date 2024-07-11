const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/roles.controller");

router.get("/", controller.index);


module.exports = router;