const express = require("express");

const router = express.Router();
const controller = require("../../controller/admin/setting.controller");

const uploadtoCloud = require("../../middlewares/admin/uploadCloud.middlewares");
const multer  = require('multer');
const upload = multer();


router.get("/general", controller.general);

router.patch("/general", 
  upload.single("logo"),
  uploadtoCloud.uploadtoCloud,
  controller.generalPost
);

module.exports = router;