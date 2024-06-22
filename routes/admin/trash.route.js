const express = require("express");
const controller = require("../../controller/admin/trash.controller");

const router = express.Router();

router.get("", controller.index);
router.patch("/restore/:id", controller.restore);
router.delete("/permanently-deleted/:id", controller.permanentlyDeleted);

module.exports = router;



