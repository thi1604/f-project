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


module.exports = router;