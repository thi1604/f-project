const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller.js");
const uploadtoCloud = require("../../middlewares/admin/uploadCloud.middlewares");
const multer  = require('multer');
const upload = multer();

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/detail/:id", controller.detail);

router.patch(
  "/detail/edit/:id",
  upload.single("avatar"),
  uploadtoCloud.uploadtoCloud,
  controller.editPatch
);
 
router.get("/change-password", controller.changePassword);
router.patch("/change-password", controller.changePasswordPatch);

// router.get("/detail/change-password/check-otp", controller.checkOtp);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", controller.forgotPasswordPost);

router.get("/password/check-otp", controller.checkOtp);

router.post("/password/check-otp", controller.checkOtpPost);

router.get("/password/reset-password", controller.resetPassword);

router.patch("/password/reset-password", controller.resetPasswordPatch);

module.exports = router;