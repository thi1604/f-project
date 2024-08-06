const settingModel = require("../../models/setting.model");


module.exports = async (req, res, next) => {
  const Setting = await settingModel.findOne({});
  
  res.locals.setting = Setting;

  next();
  
}