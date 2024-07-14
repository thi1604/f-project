// const prefixUrl = require("../../config/system");
const Roles = require("../../models/roles.model");
const account = require("../../models/accounts.model");
const Token = require("../../helper/generate.helper");
const prefixUrl = require("../../config/system");
const md5 = require('md5');

module.exports.index = (req, res) => {
  res.render("admin/pages/accounts/index.pug");
}


module.exports.create = async (req, res) => {

  const roles = await Roles.find({
    deleted: false
  }).select("title");

  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Trang tạo mới tài khoản admin",
    roles: roles
  });
}


module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  const token = Token.generateRandomString(30);
  req.body.token = token;
  const newAccount = new account(req.body);
  await newAccount.save();
  req.flash("success", "Tạo thành công!");  
  res.redirect(`/${prefixUrl}/accounts`);
}