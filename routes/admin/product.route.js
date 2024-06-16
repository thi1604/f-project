const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");

router.get("", controller.index);

// router.get("/creat", controller.creat);

router.get("/change-status/:id/:status", controller.changeStatus);

module.exports = router;