const userModel = require("../../models/user.model");
const helper = require("../../helper/generate.helper");
const md5 = require("md5");
const forgotPasswordModel = require("../../models/forgot-password.model");

module.exports.register = async (req, res) => {
  res.render("client/pages/user/register.pug", {
    pageTitle: "Trang đăng kí"
  });
}


module.exports.registerPost = async (req, res) => {
  if(!req.body.fullName || !req.body.email || !req.body.password){
    req.flash("error", "Vui lòng nhập đầy đủ thông tin bắt buộc!");
    res.redirect("back");
    return;
  }
  const subEmail = "@";
  if(!req.body.email.includes(subEmail)){
    req.flash("error", "Email không đúng định dạng!");
    res.redirect("back");
    return;
  }
  //Check xem email da ton tai hay chua
  const existUser = await userModel.findOne({
    email : req.body.email
  });

  if(existUser){
    req.flash("error", "Email đã được đăng kí!");
    res.redirect("back");
    return;
  }

  const tokenUser = helper.generateRandomString(30);

  req.body.tokenUser = tokenUser;
  req.body.password = md5(req.body.password);
  
  const user = new userModel(req.body);
  await user.save();
  const time = 24 * 3 * 60 * 60 * 1000;
  res.cookie("tokenUser", user.tokenUser, { expires: new Date(Date.now() + time)});

  req.flash("success", "Đăng kí thành công!");
  res.redirect("/");
}

module.exports.login = async (req, res) => {
  res.render("client/pages/user/login.pug", {
    pageTitle: "Trang đăng nhập"
  });
}

module.exports.loginPost = async (req, res) => {
  const emailCurrent = req.body.email;
  const user = await userModel.findOne({
    email : emailCurrent
  });
  if(!user){
    req.flash("error", "Sai thông tin email!");
    res.redirect("back");
    return;
  }
  if(md5(req.body.password) != user.password){
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }
  if(user.status == "inactive" || user.deleted == true){
    req.flash("error", "Tài khoản đã khóa hoặc đã xóa!");
    res.redirect("back");
    return;
  }
  req.flash("success", "Đăng nhập thành công!");
  const time = 24 * 3 * 60 * 60 * 1000;
  res.cookie("tokenUser", user.tokenUser, { expires: new Date(Date.now() + time)});
  res.redirect("/");
}


module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/user/login");
}

module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password.pug", {
    pageTitle: "Lấy lại mật khẩu"
  });
}

module.exports.forgotPasswordPost = async (req, res) => {
  const emailCurrent = await userModel.findOne({
    email: req.body.email,
    deleted: false
  });

  if(!emailCurrent){
    req.flash("error","Email không tồn tại trong hệ thống!");
    res.redirect("back");
    return;
  }

  const otp = helper.generateRandomNumber(6);

  const dataEmail = {
    email: emailCurrent.email,
    otp: otp,
    expireAt: Date.now() + 3 * 60 * 1000
  };

  const data = new forgotPasswordModel(dataEmail);
  await data.save();

  console.log(dataEmail);
  res.send("ok");
  // res.redirect(`/user/password/check-otp?email?${emailCurrent.email}`);
}

