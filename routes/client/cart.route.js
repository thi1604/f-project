const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller.js");

router.post("/add/:productId", controller.addPost);

router.get("/detail", controller.detail);

router.get("/delete/:id", controller.delete);


module.exports = router;