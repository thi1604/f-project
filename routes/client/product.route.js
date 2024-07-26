const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/product.controller");

router.get("/", controller.index);

router.get("/:slug", controller.category);

router.get("/creat", controller.creat);

router.get("/detail/:slug", controller.detail);

module.exports = router;