const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller.js");

router.post("/add/:productId", controller.addPost);

router.get("/detail", controller.detail);


module.exports = router;