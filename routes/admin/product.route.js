const express = require("express");
const router = express.Router();
const Alert = require("../../validates/admin/products.validates");
const controller = require("../../controller/admin/product.controller");
const uploadtoCloud = require("../../middlewares/admin/uploadCloud.middlewares");
router.get("", controller.index);

router.patch("/change-status/:id/:status", controller.changeStatus);

router.patch("/change-many-status", controller.changeManyStatus);
router.patch("/delete/:id", controller.deleteItem);
router.patch("/change-position/:id", controller.changePosition);
router.get("/create", controller.create);
//Nhung thu vien multer de nhan file tu user, su dung diskStorage
const multer  = require('multer');
const upload = multer();

router.post(
  "/create",
  upload.single('thumbnail'),
  uploadtoCloud.uploadtoCloud,
  // Lenh nay phai dung ngay sau route, neu sai express tra ve {}
  Alert.alert, // Lam phan gui req.flash cho FE(tra ve 1 object)
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single('thumbnail'), uploadtoCloud.uploadtoCloud, controller.editPatch);

router.get("/detail/:id", controller.detail);

module.exports = router;