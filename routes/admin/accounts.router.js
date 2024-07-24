const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadtoCloud = require("../../middlewares/admin/uploadCloud.middlewares");


const controller = require("../../controller/admin/accounts.controller");

router.get("", controller.index);

router.get("/create", controller.create);

router.post("/create",
 upload.single("avatar"),
 uploadtoCloud.uploadtoCloud,
 controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
  upload.single("avatar"),
  uploadtoCloud.uploadtoCloud,
  controller.editPatch
);


router.get("/detail/:id", controller.detail);

module.exports = router;