const product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const filter = {
    deleted : false // Lay data tu modul theo object filter
  };
  if(req.query.status){
    filter.status = req.query.status;
  }
  // Tìm kiếm
  let keyword = "";
  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    filter.title = regex;
    keyword = req.query.keyword;
  }
  // Hết Tìm kiếm

  const listFilter = [
    {
      label : "Tất cả",
      status : ""
    },
    {
      label : "Hoạt động",
      status : "active"
    },
    {
      label : "Dừng hoạt động",
      status : "inactive"
    }
];
  
  const Product = await product.find(filter);
  res.render("admin/pages/products/index.pug", {
    pageTitle : "Trang sản phẩm ",
    listProducts: Product,
    keyword: keyword,
    listFilter : listFilter
  });
}

