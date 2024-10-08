const userModel = require("../../models/user.model");
const helper = require("../../helper/generate.helper");
const md5 = require("md5");
const forgotPasswordModel = require("../../models/forgot-password.model");
const helperSendEmail = require("../../helper/sendEmail.helper");


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
  res.cookie(
    "cartId", 
    user.cartId, 
    { expire: new Date(Date.now() + time)}
  );
  res.redirect("/");
}

module.exports.detail = async (req, res) => {
  // console.log(req.params);
  if(req.cookies.tokenUser){
    const idUser = req.params.id;
    if(idUser != res.locals.user.id){
      req.flash("error", "Lỗi!");
      res.redirect("/");
    }
    else{
      res.render("client/pages/profile/index.pug", {
        pageTitle: "Trang chi tiết tài khoản"
      });
    }
  }
  else
    res.redirect("/user/login");
}

module.exports.editPatch = async (req, res) => {
  if(req.cookies.tokenUser) {
    const idUser = req.params.id;
    if(idUser != res.locals.user.id){
      req.flash("error", "Lỗi!");
      res.redirect("/");
    }
    else{
      const id = res.locals.user.id;
      await userModel.updateOne({
        _id: id
      }, req.body);
    }
    req.flash("success", "Cập nhật thành công!");
    res.redirect("back");
  }
  else {
    res.redirect("/user/login");
  }
}

module.exports.changePassword = async (req, res) => {
  if(req.cookies.tokenUser){
    res.render("client/pages/profile/change-password.pug",{
      pageTitle: "Đổi mật khẩu"
    });
  }
  else{
    res.redirect("/user/login");
  }
}

let dataChangePassword= {};

module.exports.changePasswordPatch = async (req, res) => {
  if(req.cookies.tokenUser){
    dataChangePassword = {passwordOld, passwordNew, passwordNewAgain} = req.body;
    if(dataChangePassword.passwordNew == ""){
      req.flash("error", "Lỗi!");
      res.redirect("/");
      return;
    }
    const user = res.locals.user;
    // console.log(passwordOld, passwordNew, passwordNewAgain);
    if(dataChangePassword.passwordNew != dataChangePassword.passwordNewAgain) {
      req.flash("error", "Mật khẩu mới không khớp!");
      res.redirect("back");
    }
    else if(md5(dataChangePassword.passwordOld) != user.password){
      req.flash("error", "Mật khẩu cũ không chính xác!");
      res.redirect("back");
    }
    else {
      const otp = helper.generateRandomNumber(6);
  
      helperSendEmail.sendEmail(
        user.email,
        "Mã OTP THAY ĐỔI MẬT KHẨU.",
        `Mã xác thực của bạn là <b style ="color: green">${otp}</b>, có hiệu lực trong 3 phút. Vui lòng không chia sẻ mã cho bất kì ai.`
      )
      const dataEmail = {
        email: user.email,
        otp: otp,
        expireAt: Date.now() + 3 * 60 * 1000
      };
  
      const data = new forgotPasswordModel(dataEmail);
      await data.save();
      res.redirect("/user/change-password/check-otp");
    }
  }
  else {
    res.redirect("/user/login");
  }
}

module.exports.changePasswordCheckOtp = async (req, res) => {
  if(req.cookies.tokenUser){
    res.render("client/pages/profile/check-otp.pug", {
      pageTitle: "Xác thực otp"
    });
  }
  else{
    res.redirect("/user/login");
  }
}

module.exports.changePasswordCheckOtpPatch = async (req, res) => {
  const user = res.locals.user;
  if(req.cookies.tokenUser){
    try {
      await userModel.updateOne({
        _id: user.id
      },{
        password: md5(dataChangePassword.passwordNew)
      });
      req.flash("success", "Đổi mật khẩu thành công!");
      res.redirect(`/user/detail/${user.id}`);
    } catch (error) {
      req.flash("error", "Lỗi!");
      res.redirect("/");
    }
  }
  else{
    res.redirect("/user/login");
  }
}

module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.clearCookie("cartId");
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
  //Tao ma otp, gui otp ve mail user
  const otp = helper.generateRandomNumber(6);

  helperSendEmail.sendEmail(
    emailCurrent.email,
    "Mã OTP LẤY LẠI MẬT KHẨU.",
    `Mã xác thực của bạn là <b style ="color: green">${otp}</b>, có hiệu lực trong 3 phút. Vui lòng không chia sẻ mã cho bất kì ai.`
  )
  const dataEmail = {
    email: emailCurrent.email,
    otp: otp,
    expireAt: Date.now() + 3 * 60 * 1000
  };

  const data = new forgotPasswordModel(dataEmail);
  await data.save();
  
  const idUser = await userModel.findOne({
    email: dataEmail.email
  }).select("id");

  res.cookie("idUser", idUser.id);

  // res.send("ok");
  res.redirect(`/user/password/check-otp?email=${emailCurrent.email}`);
}

module.exports.checkOtp = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/check-otp.pug", {
    pageTitle: "Check otp",
    email: email
  });
}

module.exports.checkOtpPost = async (req, res) => {
  const {email, otp} = req.body;
  if(!otp){
    req.flash("error", "Lỗi!");
    res.redirect("back");
    return;
  }
  const otpReal = await forgotPasswordModel.findOne({
    email: email,
    otp: otp
  });

  if(!otpReal){
    req.flash("error", "Mã otp không chính xác!");
    res.redirect("back");
    return;
  }

  res.redirect("/user/password/reset-password");
}

module.exports.resetPassword = async (req, res) => {
  // if(!req.cookies.otp){
  //   res.redirect("/user/password/forgot");
  //   return;
  // }
  res.render("client/pages/user/reset-password.pug", {
    pageTitle: "Tạo lại mật khẩu mới"
  });
}

module.exports.resetPasswordPatch = async (req, res) => {
  if(!req.cookies.idUser){
    req.flash("error", "Otp đã hết hạn!");
    res.redirect("/user/password/forgot");
    return;
  }
  if(!req.body.password){
    req.flash("error", "Lỗi!");
    res.redirect("/user/password/forgot");
    return;
  }
  // console.log(req.body);
  try {
    const newPassword = md5(req.body.password);
    // console.log(newPassword);
    await userModel.updateOne({
      _id: req.cookies.idUser
    }, {
      password: newPassword
    });
  
    const user = await userModel.findOne({
      _id: req.cookies.idUser
    }).select("tokenUser");
  
    req.flash("success", "Mật khẩu của bạn đã được đổi!");
    res.clearCookie("idUser");
    const time = 3 * 24 * 60 * 60 * 1000;
    res.cookie("tokenUser", user.tokenUser, { expires: new Date(Date.now() + time)});
    res.redirect("/");
  } catch (error) {
    res.send("403");
  }
}

module.exports.Password = async (req, res) => {
  // if(!req.cookies.otp){
  //   res.redirect("/user/password/forgot");
  //   return;
  // }
  res.render("client/pages/user/reset-password.pug", {
    pageTitle: "Tạo lại mật khẩu mới"
  });
}
