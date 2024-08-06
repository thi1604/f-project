const settingModel = require("../../models/setting.model");

module.exports.general = async (req, res) => {

  const data = await settingModel.findOne({});

  res.render("admin/pages/setting/general.pug", {
    pageTitle: "Cài đặt chung",
    setting: data
  });
}

module.exports.generalPost = async (req, res) => {

  const data = await settingModel.findOne({});

  if(data){
    await settingModel.updateOne({
      _id : data.id
    }, req.body);
  }

  else{
    const newData = new settingModel(req.body);
    await newData.save();
  }
  req.flash("success", "Cập nhật thành công!");
  res.redirect("back");
}