const ProductCategory = require("../../models/product-category.model");
const selectTreeHelper = require("../../helper/select-tree.helper");
const prefix = require("../../config/system");
const pagination = require("../../helper/pagination.helper");

module.exports.index = async (req, res) => {

  let record = await ProductCategory.find({
    deleted: false
  });

  const Pagination = await pagination(req, record, "product-category");

  if(req.query.page == '0'){
    Pagination.currentPage = 1;
  }

  record = await 
  ProductCategory
  .find({deleted: false})
  .limit(Pagination.limitItems)
  .skip(Pagination.skip);

  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    listRecord: record,
    pagination: Pagination
  });
}

module.exports.create = async (req, res) => {
  const record = await ProductCategory.find({
    deleted: false
  });

  const categoryTree = selectTreeHelper(record);

  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục sản phẩm",
    listRecord: record,
    categoryTree: categoryTree
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

module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
    const record = await ProductCategory.findOne({
      _id: id
    });
    const records = await ProductCategory.find({
      deleted: false
    });

    const listRecord = selectTreeHelper(records);
    if(record){
      res.render(`${prefix}/pages/products-category/edit.pug`,{
        pageTitle: "Trang chỉnh sửa danh mục",
        product: record,
        listRecord: listRecord
      });
    }
    else{
      res.redirect(`/${prefix}/products-category`);
    }

  }
  catch(error){
    res.redirect(`/${prefix}/products-category`);
  }
}

module.exports.editPatch = async (req, res)=> {
  const id = req.params.id;
  await ProductCategory.updateOne(
  {
    _id : id
  }, req.body);
  
  res.redirect('back');
}