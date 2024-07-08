const ProductCategory = require("../../models/product-category.model");

module.exports.index = async (req, res) => {
  const record = await ProductCategory.find({
    deleted: false
  });
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    listRecord: record
  });
}

module.exports.create = async (req, res) => {
  const record = await ProductCategory.find({
    deleted: false
  });
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục sản phẩm",
    listRecord: record
  });
}

module.exports.createPost = async (req, res) => {
  if(req.body.position){
    req.body.position = parseInt(req.body.position);
  }
  else{
    req.body.position = (await ProductCategory.countDocuments({})) + 1;
  }
  const newCategory = new ProductCategory(req.body);
  req.flash("success", "Thêm danh mục thành công !");
  await newCategory.save(); // Phai co tu await(Doi luu vao database, ko co se chua kip luu)
  res.redirect("/admin/products-category");
}