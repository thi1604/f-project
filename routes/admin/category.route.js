const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/category.controller.js')

router.get("/", controller.index);

module.exports = router;