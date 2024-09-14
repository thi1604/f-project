const express = require("express");
const controller = require("../../controller/admin/trash.controller");

const router = express.Router();

// product
router.get("/products", controller.indexProduct);
router.patch("/products/restore/:id", controller.restoreProduct);
router.delete("/products/permanently-deleted/:id", controller.permanentlyDeletedProduct);
router.patch("/products/change-many-item", controller.changeManyItemProduct);
//End product


// role
router.get("/role", controller.indexRole);
router.patch("/roles/restore/:id", controller.restorePatch);
//End role

module.exports = router;



