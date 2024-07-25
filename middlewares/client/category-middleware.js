const modelCategory = require("../../models/product-category.model");
const helper = require("../../helper/select-tree.helper");

module.exports.category = async (req, res, next) => {
  const categoryProducts = await modelCategory.find({
    deleted: false,
    status: "active"
  });

  if(categoryProducts){
    const newCategory = helper(categoryProducts);
    res.locals.layoutCategoryProducts = newCategory;
  }
  next();
};