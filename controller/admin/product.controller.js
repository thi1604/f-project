const product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const Product = await product.find({
    deleted: false
  });
  res.render("admin/pages/products/index.pug", {
    listProducts: Product 
  });
}

