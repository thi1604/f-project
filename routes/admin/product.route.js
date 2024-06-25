const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");

router.get("", controller.index);

router.patch("/change-status/:id/:status", controller.changeStatus);

router.patch("/change-many-status", controller.changeManyStatus);
router.patch("/delete/:id", controller.deleteItem);
router.patch("/change-position/:id", controller.changePosition);
router.get("/create", controller.create);
router.post("/create", controller.createPost);

module.exports = router;