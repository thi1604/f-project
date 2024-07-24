const Account = require("../../models/accounts.model");
const prefix = require("../../config/system");
const Roles = require("../../models/roles.model");


module.exports = async (req, res, next) => {
  if(req.cookies.token == ""){
    res.redirect(`/${prefix}/auth/login`);
    return;
  }
  const account = await Account.findOne({
    token: req.cookies.token,
    deleted: false
  }).select("fullName email phone avatar status role_id");

  if(!account){
    res.redirect(`/${prefix}/auth/login`);
    return;
  }

  const role = await Roles.findOne({
    _id: account.role_id
  }).select("permissions title");


  res.locals.account = account; // su dung account cho cac middleware tiep theo(chua trong res.local)
  res.locals.role = role;
  next(); //Muon sai next() phai khai bao tren tham so
}