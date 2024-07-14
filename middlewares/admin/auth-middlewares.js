const account = require("../../models/accounts.model");
const prefix = require("../../config/system");

module.exports = async (req, res, next) => {
  // const token = req.cookies.token;
  if(req.cookies.token == ""){
    res.redirect(`/${prefix}/auth/login`);
    return;
  }
  const record = await account.findOne({
    token: req.cookies.token,
    deleted: false
  });

  if(!record){
    res.redirect(`/${prefix}/auth/login`);
    return;
  }
  next(); //Muon sai next() phai khai bao tren tham so
}