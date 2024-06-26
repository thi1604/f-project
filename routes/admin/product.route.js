const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");

router.get("", controller.index);

router.patch("/change-status/:id/:status", controller.changeStatus);

router.patch("/change-many-status", controller.changeManyStatus);
router.patch("/delete/:id", controller.deleteItem);
router.patch("/change-position/:id", controller.changePosition);
router.get("/create", controller.create);
//Nhung thu vien multer de nhan file tu user, su dung diskStorage
const Storage = require("../../helper/uploadsMulter.helper");
const multer  = require('multer');
const upload = multer({ storage: Storage.storage });
router.post("/create", upload.single('thumbnail'), controller.createPost);

module.exports = router;