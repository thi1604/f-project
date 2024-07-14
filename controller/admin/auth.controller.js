const account = require("../../models/accounts.model");
const prefix = require("../../config/system");
const md5 = require("md5");

module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/login.pug", {
    pageTitle: "Trang đăng nhập"
  });
};

module.exports.loginPost = async (req, res) => {
  const {email, password} = req.body;

  const record = await account.findOne({
    email: email
  });

  if(!record){
    req.flash("error", "Tài khoản hoặc mật khẩu không chính xác!");
    res.redirect(`/${prefix}/auth/login`);
    return;
  }

  if(md5(password) != record.password){
    req.flash("error", "Mật khẩu không chính xác!");
    res.redirect(`/${prefix}/auth/login`);
    return;
  }

  req.flash("success", "Đăng nhập thành công!");
  res.cookie("token", record.token);
  res.redirect(`/${prefix}`);
}

module.exports.logOut = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${prefix}/auth/login`);
}