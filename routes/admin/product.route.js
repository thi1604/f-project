const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");

router.get("", controller.index);

// router.get("/creat", controller.creat);

router.patch("/change-status/:id/:status", controller.changeStatus);

router.patch("/change-many-status", controller.changeManyStatus);
router.patch("/delete/:id", controller.deleteItem);

module.exports = router;