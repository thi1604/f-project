const userModel = require("../../models/user.model");
const helper = require("../../helper/generate.helper");
const md5 = require("md5");

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

  res.cookie("tokenUser", user.tokenUser, {expire : new Date() + time});

  req.flash("success", "Đăng kí thành công!");
  res.redirect("/");
}