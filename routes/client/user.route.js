const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller.js");


router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", controller.forgotPasswordPost);

router.get("/password/check-otp", controller.checkOtp);

router.post("/password/check-otp", controller.checkOtpPost);

router.get("/password/reset-password", controller.resetPassword);

router.patch("/password/reset-password", controller.resetPasswordPatch);

module.exports = router;