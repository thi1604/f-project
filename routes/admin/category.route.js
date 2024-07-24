const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/category.controller.js')

router.get("/", controller.index);


router.get("/create", controller.create);

const uploadtoCloud = require("../../middlewares/admin/uploadCloud.middlewares");
const multer  = require('multer');
const upload = multer();

router.post(
  "/create",
  upload.single('thumbnail'),
  uploadtoCloud.uploadtoCloud,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single('thumbnail'),
  uploadtoCloud.uploadtoCloud,
  controller.editPatch
)

router.get("/detail/:id", controller.detail);

module.exports = router;