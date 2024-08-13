const getDataHelper = require("../../helper/get-data-to-DBoard.helper");
const product = require("../../models/product.model");
const categoryProduct = require("../../models/product-category.model");
const user = require("../../models/user.model");
const account = require("../../models/accounts.model");


module.exports.index = async (req, res) => {
  const statistic = {
    categoryProduct: await getDataHelper.countData(categoryProduct),
    product: await getDataHelper.countData(product),
    account: await getDataHelper.countData(account),
    user: await getDataHelper.countData(user)
  };

  res.render("admin/pages/home/index.pug", {
    pageTitle: "Trang tổng quan",
    statistic: statistic
  });
}