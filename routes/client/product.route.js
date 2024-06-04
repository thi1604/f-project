const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("client/pages/product/index.pug");
});

router.get("/creat", (req, res)=>{
    res.render("client/pages/product/creat.pug");
});

module.exports = router;