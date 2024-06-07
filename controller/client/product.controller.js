const Product = require("../../models/product.model.js");

module.exports.index = async (req, res) => {
    const listProduct = await Product.find({
        status: "active",
        deleted: false
    });
    res.render("client/pages/product/index.pug", {
        pageTitle: "Trang sp",
        products: listProduct
    });
};

module.exports.creat = (req, res) => {
    res.render("client/pages/product/creat.pug", {
        pageTitle: "Trang tao moi sp"
    });
};