const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller.js");

router.post("/add/:productId", controller.addPost);

router.get("/detail", controller.detail);

router.patch("/detail", controller.detailPatch);

router.get("/delete/:id", controller.delete);

router.get("/update/:productId/:quantity", controller.update);

module.exports = router;