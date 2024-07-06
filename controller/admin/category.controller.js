

module.exports.index = (req, res) => {
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm"
  });
}