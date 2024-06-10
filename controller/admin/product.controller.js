const product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const filter = {
    deleted : false
  };
  if(req.query.status){
    filter.status = req.query.status;
  }
  const Product = await product.find(filter);
  res.render("admin/pages/products/index.pug", {
    listProducts: Product 
  });
}

