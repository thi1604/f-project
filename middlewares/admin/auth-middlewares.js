const account = require("../../models/accounts.model");
const prefix = require("../../config/system");

module.exports = async (req, res) => {
  const token = res.cookie.token;
  if(!token){
    res.redirect(`/${prefix}/auth/login`);
    return;
  }
  const record = account.findOne({
    token: token,
    deleted: false
  });

  if(!record){
    res.redirect(`/${prefix}/auth/login`);
    return;
  }
  next();
}